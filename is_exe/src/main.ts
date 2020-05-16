interface IOptions {
  ignoreErrors?: boolean;
  uid?: number;
  gid?: number;
  pathExt?: Array<string>;
}

/**
 * get either GID or UID
 */
async function getId(idType: "GID" | "UID"): Promise<number> {
  const idArg = idType === "UID" ? "-u" : "-g";

  const proc = Deno.run({
    stdout: "piped",
    stderr: "inherit",
    stdin: "inherit",
    cmd: ["id", idArg],
  });

  await proc.status();
  const stdout = await proc.output();
  const id = Number(new TextDecoder().decode(stdout));
  // proc.output() already calls close() on stdout
  // when it's done. but sometimes it doesn't work
  await proc.close();
  return id;
}

/**
 * @description asyncronously test if file is executable
 */
export async function isExecutable(
  file: string,
  options?: IOptions,
): Promise<boolean> {
  try {
    const fileInfo: Deno.FileInfo = await Deno.stat(file);

    if (fileInfo.isDirectory) return false;

    const realUid = await getId("UID");
    const realGid = await getId("GID");

    return checkMode(fileInfo, { realUid, realGid }, options);
  } catch (err) {
    if (options?.ignoreErrors) {
      return false;
    }
    throw new Error(err);
  }
}

interface IRunInfo {
  realUid?: number;
  realGid?: number;
}

/**
 * root logic for checking if file information and file ownership
 * enables it to be executed
 */
function checkMode(
  fileInfo: Deno.FileInfo,
  runInfo: IRunInfo,
  options?: IOptions,
): boolean {
  const mode = fileInfo.mode;
  const fileUid = fileInfo.uid;
  const fileGid = fileInfo.gid;

  const myUid = options?.uid ?? runInfo.realUid;
  const myGid = options?.gid ?? runInfo.realGid;

  const u = parseInt("100", 8);
  const g = parseInt("010", 8);
  const o = parseInt("001", 8);
  const ug = u | g;

  if (!mode) return false;
  return Boolean(
    (mode & o) ||
      (mode & g) && fileGid === myGid ||
      (mode & u) && fileUid === myUid ||
      (mode & ug) && myUid === 0,
  );
}
