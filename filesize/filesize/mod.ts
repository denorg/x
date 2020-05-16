const b = /^(b|B)$/;

const symbol: { [index: string]: { [index: string]: Array<string> } } = {
  iec: {
    bits: ["b", "Kib", "Mib", "Gib", "Tib", "Pib", "Eib", "Zib", "Yib"],
    bytes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"],
  },
  jedec: {
    bits: ["b", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"],
    bytes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
  },
};

const defaultFullforms: { [index: string]: Array<string> } = {
  iec: ["", "kibi", "mebi", "gibi", "tebi", "pebi", "exbi", "zebi", "yobi"],
  jedec: ["", "kilo", "mega", "giga", "tera", "peta", "exa", "zetta", "yotta"],
};

/**
 * filesize
 *
 * @method filesize
 * @param  {Int}       bytes      Int to transform
 * @param  {Options}   descriptor [Optional] Flags
 * @return {String}               Readable file size String
 */

export class Options {
  bits: boolean;
  unix: boolean;
  base: number;
  round: number;
  locale: string | boolean;
  localeOptions: object;
  separator: string;
  spacer: string;
  symbols: { [index: string]: any };
  standard: string;
  output: string;
  fullform: boolean;
  fullforms: Array<string>;
  exponent: number;

  constructor({
    bits = false,
    unix = false,
    base = 2,
    round,
    locale = "",
    localeOptions = {},
    separator = "",
    spacer,
    symbols = {},
    standard,
    output = "string",
    fullform = false,
    fullforms = [],
    exponent = -1,
  }: {
    bits?: boolean;
    unix?: boolean;
    base?: number;
    round?: number;
    locale?: string | boolean;
    localeOptions?: object;
    separator?: string;
    spacer?: string;
    symbols?: { [index: string]: any };
    standard?: string;
    output?: string;
    fullform?: boolean;
    fullforms?: Array<string>;
    exponent?: number;
  } = {}) {
    this.bits = bits;
    this.unix = unix;
    this.base = base;
    this.round = round !== undefined ? round : (this.unix ? 1 : 2);
    this.locale = locale;
    this.localeOptions = localeOptions;
    this.separator = separator;
    this.spacer = spacer !== undefined ? spacer : (this.unix ? "" : " ");
    this.symbols = symbols;
    this.standard = this.base === 2 ? standard || "jedec" : "jedec";
    this.output = output;
    this.fullform = fullform;
    this.fullforms = fullforms;
    this.exponent = exponent;
  }
}

export function filesize(
  bytes: number,
  descriptor: Options = new Options(),
) {
  let result0: number;
  let result0Str: string | undefined = undefined;
  let result1: string;
  let val = 0;
  // let e
  // let base; let bits; let ceil; let full; let fullforms; let locale; let localeOptions
  // let neg; let num; let output; let round; let unix; let separator; let spacer; let standard; let symbols

  if (isNaN(bytes)) {
    throw new TypeError("Invalid number");
  }

  // bits = descriptor.bits === true
  // unix = descriptor.unix === true
  // base = descriptor.base || 2
  // round = descriptor.round !== void 0 ? descriptor.round : unix ? 1 : 2
  // locale = descriptor.locale !== void 0 ? descriptor.locale : ''
  // localeOptions = descriptor.localeOptions || {}
  // separator = descriptor.separator !== void 0 ? descriptor.separator : ''
  // spacer = descriptor.spacer !== void 0 ? descriptor.spacer : unix ? '' : ' '
  // symbols = descriptor.symbols || {}
  // standard = base === 2 ? descriptor.standard || 'jedec' : 'jedec'
  // output = descriptor.output || 'string'
  // full = descriptor.fullform === true
  // fullforms = descriptor.fullforms instanceof Array ? descriptor.fullforms : []
  let e = descriptor.exponent !== void 0 ? descriptor.exponent : -1;
  let num = Number(bytes);
  const neg = num < 0;
  const ceil = descriptor.base > 2 ? 1000 : 1024;

  // Flipping a negative number to determine the size
  if (neg) {
    num = -num;
  }

  // Determining the exponent
  if (e === -1 || isNaN(e)) {
    e = Math.floor(Math.log(num) / Math.log(ceil));

    if (e < 0) {
      e = 0;
    }
  }

  // Exceeding supported length, time to reduce & multiply
  if (e > 8) {
    e = 8;
  }

  if (descriptor.output === "exponent") {
    return e;
  }

  // Zero is now a special case because bytes divide by 1
  if (num === 0) {
    result0 = 0;
    result1 = descriptor.unix
      ? ""
      : symbol[descriptor.standard][descriptor.bits ? "bits" : "bytes"][e];
  } else {
    val = num / (descriptor.base === 2
      ? Math.pow(2, e * 10)
      : Math.pow(1000, e));

    if (descriptor.bits) {
      val = val * 8;

      if (val >= ceil && e < 8) {
        val = val / ceil;
        e++;
      }
    }

    result0 = Number(val.toFixed(e > 0 ? descriptor.round : 0));

    if (result0 === ceil && e < 8 && descriptor.exponent === void 0) {
      result0 = 1;
      e++;
    }

    result1 = descriptor.base === 10 && e === 1
      ? descriptor.bits ? "kb" : "kB"
      : symbol[descriptor.standard][descriptor.bits ? "bits" : "bytes"][e];

    if (descriptor.unix) {
      result1 = descriptor.standard === "jedec"
        ? result1.charAt(0)
        : e > 0
        ? result1.replace(/B$/, "")
        : result1;

      if (b.test(result1)) {
        result0 = Math.floor(result0);
        result1 = "";
      }
    }
  }

  // Decorating a 'diff'
  if (neg) {
    result0 = -result0;
  }

  // Applying custom symbol
  result1 = descriptor.symbols[result1] || result1;

  if (descriptor.locale === true) {
    result0Str = result0.toLocaleString();
  } else if (
    typeof descriptor.locale === "string" && descriptor.locale.length > 0
  ) {
    result0Str = result0.toLocaleString(
      descriptor.locale,
      descriptor.localeOptions,
    );
  } else if (descriptor.separator.length > 0) {
    result0Str = result0.toString().replace(".", descriptor.separator);
  }

  // Returning Array, Object, or String (default)
  if (descriptor.output === "array") {
    return [result0Str === undefined ? result0 : result0Str, result1];
  }

  if (descriptor.fullform) {
    result1 = descriptor.fullforms[e]
      ? descriptor.fullforms[e]
      : defaultFullforms[descriptor.standard][e] + (descriptor.bits
        ? "bit"
        : "byte") +
        (result0 === 1 ? "" : "s");
  }

  if (descriptor.output === "object") {
    return { value: result0, symbol: result1, exponent: e };
  }

  return [result0Str === undefined ? result0 : result0Str, result1].join(
    descriptor.spacer,
  );
}
