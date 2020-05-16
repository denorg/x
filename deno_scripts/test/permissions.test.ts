import { argifyPermissions } from "../lib/permissions.ts";
import { assertEquals } from "../dev_deps.ts";

Deno.test("argifies permissions", () => {
  /**
   * Allow all simplifies
   */
  assertEquals(
    argifyPermissions(
      {
        allowAll: true,
        allowHRTime: true,
        allowEnv: true,
        allowNet: true,
        allowPlugin: true,
        allowRead: true,
        allowRun: true,
        allowWrite: true,
      },
      {}
    ),
    ["--allow-all"]
  );

  /**
   * Individually, only true
   */
  assertEquals(
    argifyPermissions(
      {
        allowHRTime: true,
        allowEnv: true,
        allowNet: true,
        allowPlugin: true,
        allowRead: true,
        allowRun: true,
        allowWrite: true,
      },
      {}
    ),
    [
      "--allow-hrtime",
      "--allow-env",
      "--allow-net",
      "--allow-plugin",
      "--allow-read",
      "--allow-run",
      "--allow-write",
    ]
  );

  /**
   * Individually, with string specifiers
   */
  assertEquals(
    argifyPermissions(
      {
        allowHRTime: true,
        allowEnv: true,
        allowNet: "net",
        allowPlugin: true,
        allowRead: "read",
        allowRun: true,
        allowWrite: "write",
      },
      {}
    ),
    [
      "--allow-hrtime",
      "--allow-env",
      "--allow-net=net",
      "--allow-plugin",
      "--allow-read=read",
      "--allow-run",
      "--allow-write=write",
    ]
  );
});
