import {
  getEnvironmentVariable,
  cleanWindowsCommand,
  exec,
  makeUsernameFromId,
} from "./utils.ts";

/**
 * Get the username of the current user.
 *
 * It first tries to get the username from the `SUDO_USER` `LOGNAME` `USER` `LNAME` `USERNAME`
 * environment variables.
 *
 * Then falls back to `$ id -un` on macOS / Linux and `$ whoami` on Windows,
 * in the rare case none of the environment variables are set.
 *
 * Requires the `--allow-env` and `--allow-run` flags.
 *
 * @returns The username.
 */
export default async function username(): Promise<string | undefined> {
  const envVariable = getEnvironmentVariable();
  if (envVariable) {
    return envVariable;
  }

  // First we try to get the ID of the user and then the actual username.
  // We do this because in `docker run --user <uid>:<gid>` context,
  // we don't have "username" available.
  try {
    if (Deno.build.os === "win") {
      return cleanWindowsCommand(await exec(["whoami"]));
    }

    const userId = await exec(["id", "-u"]);
    try {
      return await exec(["id", "-un", userId]);
    } catch (_) {}

    return makeUsernameFromId(userId);
  } catch (_) {}
}
