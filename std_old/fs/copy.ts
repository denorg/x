// Copyright 2018-2019 the Deno authors. All rights reserved. MIT license.
import * as path from "./path/mod.ts";
import { ensureDir, ensureDirSync } from "./ensure_dir.ts";
import { isSubdir, getFileInfoType } from "./utils.ts";

export interface CopyOptions {
  /**
   * overwrite existing file or directory. Default is `false`
   */
  overwrite?: boolean;
  /**
   * When `true`, will set last modification and access times to the ones of the
   * original source files.
   * When `false`, timestamp behavior is OS-dependent.
   * Default is `false`.
   */
  preserveTimestamps?: boolean;
}

async function ensureValidCopy(
  src: string,
  dest: string,
  options: CopyOptions,
  isCopyFolder = false
): Promise<Deno.FileInfo> {
  const destStat: Deno.FileInfo | null = await Deno.lstat(dest).catch(
    (): Promise<null> => Promise.resolve(null)
  );

  if (destStat) {
    if (isCopyFolder && !destStat.isDirectory()) {
      throw new Error(
        `Cannot overwrite non-directory '${dest}' with directory '${src}'.`
      );
    }
    if (!options.overwrite) {
      throw new Error(`'${dest}' already exists.`);
    }
  }

  return destStat!;
}

function ensureValidCopySync(
  src: string,
  dest: string,
  options: CopyOptions,
  isCopyFolder = false
): Deno.FileInfo {
  let destStat: Deno.FileInfo | null;

  try {
    destStat = Deno.lstatSync(dest);
  } catch {
    // ignore error
  }

  if (destStat!) {
    if (isCopyFolder && !destStat!.isDirectory()) {
      throw new Error(
        `Cannot overwrite non-directory '${dest}' with directory '${src}'.`
      );
    }
    if (!options.overwrite) {
      throw new Error(`'${dest}' already exists.`);
    }
  }

  return destStat!;
}

/* copy file to dest */
async function copyFile(
  src: string,
  dest: string,
  options: CopyOptions
): Promise<void> {
  await ensureValidCopy(src, dest, options);
  await Deno.copyFile(src, dest);
  if (options.preserveTimestamps) {
    const statInfo = await Deno.stat(src);
    await Deno.utime(dest, statInfo.accessed!, statInfo.modified!);
  }
}
/* copy file to dest synchronously */
function copyFileSync(src: string, dest: string, options: CopyOptions): void {
  ensureValidCopySync(src, dest, options);
  Deno.copyFileSync(src, dest);
  if (options.preserveTimestamps) {
    const statInfo = Deno.statSync(src);
    Deno.utimeSync(dest, statInfo.accessed!, statInfo.modified!);
  }
}

/* copy symlink to dest */
async function copySymLink(
  src: string,
  dest: string,
  options: CopyOptions
): Promise<void> {
  await ensureValidCopy(src, dest, options);
  const originSrcFilePath = await Deno.readlink(src);
  const type = getFileInfoType(await Deno.lstat(src));
  await Deno.symlink(originSrcFilePath, dest, type);
  if (options.preserveTimestamps) {
    const statInfo = await Deno.lstat(src);
    await Deno.utime(dest, statInfo.accessed!, statInfo.modified!);
  }
}

/* copy symlink to dest synchronously */
function copySymlinkSync(
  src: string,
  dest: string,
  options: CopyOptions
): void {
  ensureValidCopySync(src, dest, options);
  const originSrcFilePath = Deno.readlinkSync(src);
  const type = getFileInfoType(Deno.lstatSync(src));
  Deno.symlinkSync(originSrcFilePath, dest, type);
  if (options.preserveTimestamps) {
    const statInfo = Deno.lstatSync(src);
    Deno.utimeSync(dest, statInfo.accessed!, statInfo.modified!);
  }
}

/* copy folder from src to dest. */
async function copyDir(
  src: string,
  dest: string,
  options: CopyOptions
): Promise<void> {
  const destStat = await ensureValidCopy(src, dest, options, true);

  if (!destStat) {
    await ensureDir(dest);
  }

  if (options.preserveTimestamps) {
    const srcStatInfo = await Deno.stat(src);
    await Deno.utime(dest, srcStatInfo.accessed!, srcStatInfo.modified!);
  }

  const files = await Deno.readDir(src);

  for (const file of files) {
    const srcPath = path.join(src, file.name!);
    const destPath = path.join(dest, path.basename(srcPath as string));
    if (file.isDirectory()) {
      await copyDir(srcPath, destPath, options);
    } else if (file.isFile()) {
      await copyFile(srcPath, destPath, options);
    } else if (file.isSymlink()) {
      await copySymLink(srcPath, destPath, options);
    }
  }
}

/* copy folder from src to dest synchronously */
function copyDirSync(src: string, dest: string, options: CopyOptions): void {
  const destStat: Deno.FileInfo = ensureValidCopySync(src, dest, options, true);

  if (!destStat) {
    ensureDirSync(dest);
  }

  if (options.preserveTimestamps) {
    const srcStatInfo = Deno.statSync(src);
    Deno.utimeSync(dest, srcStatInfo.accessed!, srcStatInfo.modified!);
  }

  const files = Deno.readDirSync(src);

  for (const file of files) {
    const srcPath = path.join(src, file.name!);
    const destPath = path.join(dest, path.basename(srcPath as string));
    if (file.isDirectory()) {
      copyDirSync(srcPath, destPath, options);
    } else if (file.isFile()) {
      copyFileSync(srcPath, destPath, options);
    } else if (file.isSymlink()) {
      copySymlinkSync(srcPath, destPath, options);
    }
  }
}

/**
 * Copy a file or directory. The directory can have contents. Like `cp -r`.
 * @param src the file/directory path.
 *            Note that if `src` is a directory it will copy everything inside
 *            of this directory, not the entire directory itself
 * @param dest the destination path. Note that if `src` is a file, `dest` cannot
 *             be a directory
 * @param options
 */
export async function copy(
  src: string,
  dest: string,
  options: CopyOptions = {}
): Promise<void> {
  src = path.resolve(src);
  dest = path.resolve(dest);

  if (src === dest) {
    throw new Error("Source and destination cannot be the same.");
  }

  const srcStat = await Deno.lstat(src);

  if (srcStat.isDirectory() && isSubdir(src, dest)) {
    throw new Error(
      `Cannot copy '${src}' to a subdirectory of itself, '${dest}'.`
    );
  }

  if (srcStat.isDirectory()) {
    await copyDir(src, dest, options);
  } else if (srcStat.isFile()) {
    await copyFile(src, dest, options);
  } else if (srcStat.isSymlink()) {
    await copySymLink(src, dest, options);
  }
}

/**
 * Copy a file or directory. The directory can have contents. Like `cp -r`.
 * @param src the file/directory path.
 *            Note that if `src` is a directory it will copy everything inside
 *            of this directory, not the entire directory itself
 * @param dest the destination path. Note that if `src` is a file, `dest` cannot
 *             be a directory
 * @param options
 */
export function copySync(
  src: string,
  dest: string,
  options: CopyOptions = {}
): void {
  src = path.resolve(src);
  dest = path.resolve(dest);

  if (src === dest) {
    throw new Error("Source and destination cannot be the same.");
  }

  const srcStat = Deno.lstatSync(src);

  if (srcStat.isDirectory() && isSubdir(src, dest)) {
    throw new Error(
      `Cannot copy '${src}' to a subdirectory of itself, '${dest}'.`
    );
  }

  if (srcStat.isDirectory()) {
    copyDirSync(src, dest, options);
  } else if (srcStat.isFile()) {
    copyFileSync(src, dest, options);
  } else if (srcStat.isSymlink()) {
    copySymlinkSync(src, dest, options);
  }
}
