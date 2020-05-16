import { defaultEmptyArray, defaultEmptyObject } from "./utils.ts";

import type { Permissions } from "../mod.ts";

export function argifyPermissions(
  localPermissions: Permissions = defaultEmptyObject,
  globalPermissions: Permissions = defaultEmptyObject
): string[] {
  if (
    localPermissions === defaultEmptyObject &&
    globalPermissions === defaultEmptyObject
  ) {
    return defaultEmptyArray;
  }

  const permissions: Permissions = {
    ...globalPermissions,
    ...localPermissions,
  };

  if (permissions.allowAll) return ["--allow-all"];

  return Object.entries(permissions).reduce(
    (argsPermissions, [permissionName, permissionValue]) => {
      if (permissionValue) {
        switch (permissionName as keyof Permissions) {
          case "allowEnv": {
            argsPermissions.push("--allow-env");
            break;
          }
          case "allowHRTime": {
            argsPermissions.push("--allow-hrtime");
            break;
          }
          case "allowNet": {
            if (typeof permissionValue === "string") {
              argsPermissions.push(`--allow-net=${permissionValue}`);
            } else {
              argsPermissions.push("--allow-net");
            }
            break;
          }
          case "allowPlugin": {
            argsPermissions.push("--allow-plugin");
            break;
          }
          case "allowRead": {
            if (typeof permissionValue === "string") {
              argsPermissions.push(`--allow-read=${permissionValue}`);
            } else {
              argsPermissions.push("--allow-read");
            }
            break;
          }
          case "allowRun": {
            argsPermissions.push("--allow-run");
            break;
          }
          case "allowWrite": {
            if (typeof permissionValue === "string") {
              argsPermissions.push(`--allow-write=${permissionValue}`);
            } else {
              argsPermissions.push("--allow-write");
            }
            break;
          }
        }
      }
      return argsPermissions;
    },
    [] as string[]
  );
}
