// Copyright 2018-2019 the Deno authors. All rights reserved. MIT license.

const { Buffer, copy, remove } = Deno;
const { min, max } = Math;
type Closer = Deno.Closer;
type Reader = Deno.Reader;
type Writer = Deno.Writer;
import { FormFile } from "../multipart/formfile.ts";
import { equal, findIndex, findLastIndex, hasPrefix } from "../bytes/mod.ts";
import { extname } from "../fs/path.ts";
import { copyN } from "../io/ioutil.ts";
import { MultiReader } from "../io/readers.ts";
import { tempFile } from "../io/util.ts";
import { BufReader, BufWriter, UnexpectedEOFError } from "../io/bufio.ts";
import { encoder } from "../strings/mod.ts";
import { assertStrictEq } from "../testing/asserts.ts";
import { TextProtoReader } from "../textproto/mod.ts";

function randomBoundary(): string {
  let boundary = "--------------------------";
  for (let i = 0; i < 24; i++) {
    boundary += Math.floor(Math.random() * 10).toString(16);
  }
  return boundary;
}

/**
 * Checks whether `buf` should be considered to match the boundary.
 *
 * The prefix is "--boundary" or "\r\n--boundary" or "\n--boundary", and the
 * caller has verified already that `hasPrefix(buf, prefix)` is true.
 *
 * `matchAfterPrefix()` returns `1` if the buffer does match the boundary,
 * meaning the prefix is followed by a dash, space, tab, cr, nl, or EOF.
 *
 * It returns `-1` if the buffer definitely does NOT match the boundary,
 * meaning the prefix is followed by some other character.
 * For example, "--foobar" does not match "--foo".
 *
 * It returns `0` more input needs to be read to make the decision,
 * meaning that `buf.length` and `prefix.length` are the same.
 */
export function matchAfterPrefix(
  buf: Uint8Array,
  prefix: Uint8Array,
  eof: boolean
): -1 | 0 | 1 {
  if (buf.length === prefix.length) {
    return eof ? 1 : 0;
  }
  const c = buf[prefix.length];
  if (
    c === " ".charCodeAt(0) ||
    c === "\t".charCodeAt(0) ||
    c === "\r".charCodeAt(0) ||
    c === "\n".charCodeAt(0) ||
    c === "-".charCodeAt(0)
  ) {
    return 1;
  }
  return -1;
}

/**
 * Scans `buf` to identify how much of it can be safely returned as part of the
 * `PartReader` body.
 *
 * @param buf - The buffer to search for boundaries.
 * @param dashBoundary - Is "--boundary".
 * @param newLineDashBoundary - Is "\r\n--boundary" or "\n--boundary", depending
 * on what mode we are in. The comments below (and the name) assume
 * "\n--boundary", but either is accepted.
 * @param total - The number of bytes read out so far. If total == 0, then a
 * leading "--boundary" is recognized.
 * @param eof - Whether `buf` contains the final bytes in the stream before EOF.
 * If `eof` is false, more bytes are expected to follow.
 * @returns The number of data bytes from buf that can be returned as part of
 * the `PartReader` body.
 */
export function scanUntilBoundary(
  buf: Uint8Array,
  dashBoundary: Uint8Array,
  newLineDashBoundary: Uint8Array,
  total: number,
  eof: boolean
): number | Deno.EOF {
  if (total === 0) {
    // At beginning of body, allow dashBoundary.
    if (hasPrefix(buf, dashBoundary)) {
      switch (matchAfterPrefix(buf, dashBoundary, eof)) {
        case -1:
          return dashBoundary.length;
        case 0:
          return 0;
        case 1:
          return Deno.EOF;
      }
    }
    if (hasPrefix(dashBoundary, buf)) {
      return 0;
    }
  }

  // Search for "\n--boundary".
  const i = findIndex(buf, newLineDashBoundary);
  if (i >= 0) {
    switch (matchAfterPrefix(buf.slice(i), newLineDashBoundary, eof)) {
      case -1:
        return i + newLineDashBoundary.length;
      case 0:
        return i;
      case 1:
        return i > 0 ? i : Deno.EOF;
    }
  }
  if (hasPrefix(newLineDashBoundary, buf)) {
    return 0;
  }

  // Otherwise, anything up to the final \n is not part of the boundary and so
  // must be part of the body. Also, if the section from the final \n onward is
  // not a prefix of the boundary, it too must be part of the body.
  const j = findLastIndex(buf, newLineDashBoundary.slice(0, 1));
  if (j >= 0 && hasPrefix(newLineDashBoundary, buf.slice(j))) {
    return j;
  }

  return buf.length;
}

class PartReader implements Reader, Closer {
  n: number | Deno.EOF = 0;
  total = 0;

  constructor(private mr: MultipartReader, public readonly headers: Headers) {}

  async read(p: Uint8Array): Promise<number | Deno.EOF> {
    const br = this.mr.bufReader;

    // Read into buffer until we identify some data to return,
    // or we find a reason to stop (boundary or EOF).
    let peekLength = 1;
    while (this.n === 0) {
      peekLength = max(peekLength, br.buffered());
      const peekBuf = await br.peek(peekLength);
      if (peekBuf === Deno.EOF) {
        throw new UnexpectedEOFError();
      }
      const eof = peekBuf.length < peekLength;
      this.n = scanUntilBoundary(
        peekBuf,
        this.mr.dashBoundary,
        this.mr.newLineDashBoundary,
        this.total,
        eof
      );
      if (this.n === 0) {
        // Force buffered I/O to read more into buffer.
        assertStrictEq(eof, false);
        peekLength++;
      }
    }

    if (this.n === Deno.EOF) {
      return Deno.EOF;
    }

    const nread = min(p.length, this.n);
    const buf = p.subarray(0, nread);
    const r = await br.readFull(buf);
    assertStrictEq(r, buf);
    this.n -= nread;
    this.total += nread;
    return nread;
  }

  close(): void {}

  private contentDisposition!: string;
  private contentDispositionParams!: { [key: string]: string };

  private getContentDispositionParams(): { [key: string]: string } {
    if (this.contentDispositionParams) return this.contentDispositionParams;
    const cd = this.headers.get("content-disposition");
    const params: { [key: string]: string } = {};
    const comps = cd!.split(";");
    this.contentDisposition = comps[0];
    comps
      .slice(1)
      .map((v: string): string => v.trim())
      .map((kv: string): void => {
        const [k, v] = kv.split("=");
        if (v) {
          const s = v.charAt(0);
          const e = v.charAt(v.length - 1);
          if ((s === e && s === '"') || s === "'") {
            params[k] = v.substr(1, v.length - 2);
          } else {
            params[k] = v;
          }
        }
      });
    return (this.contentDispositionParams = params);
  }

  get fileName(): string {
    return this.getContentDispositionParams()["filename"];
  }

  get formName(): string {
    const p = this.getContentDispositionParams();
    if (this.contentDisposition === "form-data") {
      return p["name"];
    }
    return "";
  }
}

function skipLWSPChar(u: Uint8Array): Uint8Array {
  const ret = new Uint8Array(u.length);
  const sp = " ".charCodeAt(0);
  const ht = "\t".charCodeAt(0);
  let j = 0;
  for (let i = 0; i < u.length; i++) {
    if (u[i] === sp || u[i] === ht) continue;
    ret[j++] = u[i];
  }
  return ret.slice(0, j);
}

/** Reader for parsing multipart/form-data */
export class MultipartReader {
  readonly newLine = encoder.encode("\r\n");
  readonly newLineDashBoundary = encoder.encode(`\r\n--${this.boundary}`);
  readonly dashBoundaryDash = encoder.encode(`--${this.boundary}--`);
  readonly dashBoundary = encoder.encode(`--${this.boundary}`);
  readonly bufReader: BufReader;

  constructor(reader: Reader, private boundary: string) {
    this.bufReader = new BufReader(reader);
  }

  /** Read all form data from stream.
   * If total size of stored data in memory exceed maxMemory,
   * overflowed file data will be written to temporal files.
   * String field values are never written to files */
  async readForm(
    maxMemory: number
  ): Promise<{ [key: string]: string | FormFile }> {
    const result = Object.create(null);
    let maxValueBytes = maxMemory + (10 << 20);
    const buf = new Buffer(new Uint8Array(maxValueBytes));
    for (;;) {
      const p = await this.nextPart();
      if (p === Deno.EOF) {
        break;
      }
      if (p.formName === "") {
        continue;
      }
      buf.reset();
      if (!p.fileName) {
        // value
        const n = await copyN(buf, p, maxValueBytes);
        maxValueBytes -= n;
        if (maxValueBytes < 0) {
          throw new RangeError("message too large");
        }
        const value = buf.toString();
        result[p.formName] = value;
        continue;
      }
      // file
      let formFile: FormFile;
      const n = await copy(buf, p);
      if (n > maxMemory) {
        // too big, write to disk and flush buffer
        const ext = extname(p.fileName);
        const { file, filepath } = await tempFile(".", {
          prefix: "multipart-",
          postfix: ext
        });
        try {
          const size = await copyN(
            file,
            new MultiReader(buf, p),
            maxValueBytes
          );
          file.close();
          formFile = {
            filename: p.fileName,
            type: p.headers.get("content-type")!,
            tempfile: filepath,
            size
          };
        } catch (e) {
          await remove(filepath);
        }
      } else {
        formFile = {
          filename: p.fileName,
          type: p.headers.get("content-type")!,
          content: buf.bytes(),
          size: buf.length
        };
        maxMemory -= n;
        maxValueBytes -= n;
      }
      result[p.formName] = formFile!;
    }
    return result;
  }

  private currentPart: PartReader | undefined;
  private partsRead = 0;

  private async nextPart(): Promise<PartReader | Deno.EOF> {
    if (this.currentPart) {
      this.currentPart.close();
    }
    if (equal(this.dashBoundary, encoder.encode("--"))) {
      throw new Error("boundary is empty");
    }
    let expectNewPart = false;
    for (;;) {
      const line = await this.bufReader.readSlice("\n".charCodeAt(0));
      if (line === Deno.EOF) {
        throw new UnexpectedEOFError();
      }
      if (this.isBoundaryDelimiterLine(line)) {
        this.partsRead++;
        const r = new TextProtoReader(this.bufReader);
        const headers = await r.readMIMEHeader();
        if (headers === Deno.EOF) {
          throw new UnexpectedEOFError();
        }
        const np = new PartReader(this, headers);
        this.currentPart = np;
        return np;
      }
      if (this.isFinalBoundary(line)) {
        return Deno.EOF;
      }
      if (expectNewPart) {
        throw new Error(`expecting a new Part; got line ${line}`);
      }
      if (this.partsRead === 0) {
        continue;
      }
      if (equal(line, this.newLine)) {
        expectNewPart = true;
        continue;
      }
      throw new Error(`unexpected line in nextPart(): ${line}`);
    }
  }

  private isFinalBoundary(line: Uint8Array): boolean {
    if (!hasPrefix(line, this.dashBoundaryDash)) {
      return false;
    }
    const rest = line.slice(this.dashBoundaryDash.length, line.length);
    return rest.length === 0 || equal(skipLWSPChar(rest), this.newLine);
  }

  private isBoundaryDelimiterLine(line: Uint8Array): boolean {
    if (!hasPrefix(line, this.dashBoundary)) {
      return false;
    }
    const rest = line.slice(this.dashBoundary.length);
    return equal(skipLWSPChar(rest), this.newLine);
  }
}

class PartWriter implements Writer {
  closed = false;
  private readonly partHeader: string;
  private headersWritten = false;

  constructor(
    private writer: Writer,
    readonly boundary: string,
    public headers: Headers,
    isFirstBoundary: boolean
  ) {
    let buf = "";
    if (isFirstBoundary) {
      buf += `--${boundary}\r\n`;
    } else {
      buf += `\r\n--${boundary}\r\n`;
    }
    for (const [key, value] of headers.entries()) {
      buf += `${key}: ${value}\r\n`;
    }
    buf += `\r\n`;
    this.partHeader = buf;
  }

  close(): void {
    this.closed = true;
  }

  async write(p: Uint8Array): Promise<number> {
    if (this.closed) {
      throw new Error("part is closed");
    }
    if (!this.headersWritten) {
      await this.writer.write(encoder.encode(this.partHeader));
      this.headersWritten = true;
    }
    return this.writer.write(p);
  }
}

function checkBoundary(b: string): string {
  if (b.length < 1 || b.length > 70) {
    throw new Error(`invalid boundary length: ${b.length}`);
  }
  const end = b.length - 1;
  for (let i = 0; i < end; i++) {
    const c = b.charAt(i);
    if (!c.match(/[a-zA-Z0-9'()+_,\-./:=?]/) || (c === " " && i !== end)) {
      throw new Error("invalid boundary character: " + c);
    }
  }
  return b;
}

/** Writer for creating multipart/form-data */
export class MultipartWriter {
  private readonly _boundary: string;

  get boundary(): string {
    return this._boundary;
  }

  private lastPart: PartWriter | undefined;
  private bufWriter: BufWriter;
  private isClosed = false;

  constructor(private readonly writer: Writer, boundary?: string) {
    if (boundary !== void 0) {
      this._boundary = checkBoundary(boundary);
    } else {
      this._boundary = randomBoundary();
    }
    this.bufWriter = new BufWriter(writer);
  }

  formDataContentType(): string {
    return `multipart/form-data; boundary=${this.boundary}`;
  }

  private createPart(headers: Headers): Writer {
    if (this.isClosed) {
      throw new Error("multipart: writer is closed");
    }
    if (this.lastPart) {
      this.lastPart.close();
    }
    const part = new PartWriter(
      this.writer,
      this.boundary,
      headers,
      !this.lastPart
    );
    this.lastPart = part;
    return part;
  }

  createFormFile(field: string, filename: string): Writer {
    const h = new Headers();
    h.set(
      "Content-Disposition",
      `form-data; name="${field}"; filename="${filename}"`
    );
    h.set("Content-Type", "application/octet-stream");
    return this.createPart(h);
  }

  createFormField(field: string): Writer {
    const h = new Headers();
    h.set("Content-Disposition", `form-data; name="${field}"`);
    h.set("Content-Type", "application/octet-stream");
    return this.createPart(h);
  }

  async writeField(field: string, value: string): Promise<void> {
    const f = await this.createFormField(field);
    await f.write(encoder.encode(value));
  }

  async writeFile(
    field: string,
    filename: string,
    file: Reader
  ): Promise<void> {
    const f = await this.createFormFile(field, filename);
    await copy(f, file);
  }

  private flush(): Promise<void> {
    return this.bufWriter.flush();
  }

  /** Close writer. No additional data can be writen to stream */
  async close(): Promise<void> {
    if (this.isClosed) {
      throw new Error("multipart: writer is closed");
    }
    if (this.lastPart) {
      this.lastPart.close();
      this.lastPart = void 0;
    }
    await this.writer.write(encoder.encode(`\r\n--${this.boundary}--\r\n`));
    await this.flush();
    this.isClosed = true;
  }
}
