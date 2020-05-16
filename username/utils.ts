export function getEnvironmentVariable(): string {
  const env = Deno.env();

  return (
    env.SUDO_USER ||
    env.C9_USER /* Cloud9 */ ||
    env.LOGNAME ||
    env.USER ||
    env.LNAME ||
    env.USERNAME
  );
}

export function cleanWindowsCommand(x: string): string {
  return x.replace(/^.*\\/, "");
}

export function makeUsernameFromId(userId: string): string {
  return `no-username-${userId}`;
}

export async function exec(cmd: string[]): Promise<string> {
  const process: Deno.Process = Deno.run({ cmd });
  const decoder = new TextDecoder();
  return decoder.decode(await process.output());
}
