const filenameBase = "test_plugin";

let filenameSuffix = ".so";
let filenamePrefix = "lib";

if (Deno.build.os === "windows") {
  filenameSuffix = ".dll";
  filenamePrefix = "";
}
if (Deno.build.os === "darwin") {
  filenameSuffix = ".dylib";
}

const filename = `../target/${Deno.args[0]}/${filenamePrefix}${filenameBase}${filenameSuffix}`;

// This will be checked against open resources after Plugin.close()
// in runTestClose() below.
const resourcesPre = Deno.resources();

const rid = Deno.openPlugin(filename);

const { testSync, testAsync } = Deno.core.ops();
if (!(testSync > 0)) {
  throw "bad op id for testSync";
}
if (!(testAsync > 0)) {
  throw "bad op id for testAsync";
}

const textDecoder = new TextDecoder();

function runTestSync() {
  const response = Deno.core.dispatch(
    testSync,
    new Uint8Array([116, 101, 115, 116]),
    new Uint8Array([116, 101, 115, 116])
  );

  console.log(`Plugin Sync Response: ${textDecoder.decode(response)}`);
}

Deno.core.setAsyncHandler(testAsync, (response) => {
  console.log(`Plugin Async Response: ${textDecoder.decode(response)}`);
});

function runTestAsync() {
  const response = Deno.core.dispatch(
    testAsync,
    new Uint8Array([116, 101, 115, 116]),
    new Uint8Array([116, 101, 115, 116])
  );

  if (response != null || response != undefined) {
    throw new Error("Expected null response!");
  }
}

function runTestOpCount() {
  const start = Deno.metrics();

  Deno.core.dispatch(testSync, new Uint8Array([116, 101, 115, 116]));

  const end = Deno.metrics();

  if (end.opsCompleted - start.opsCompleted !== 1) {
    // one op for the plugin and one for Deno.metrics
    throw new Error("The opsCompleted metric is not correct!");
  }
  if (end.opsDispatched - start.opsDispatched !== 1) {
    // one op for the plugin and one for Deno.metrics
    throw new Error("The opsDispatched metric is not correct!");
  }
}

function runTestPluginClose() {
  Deno.close(rid);

  const resourcesPost = Deno.resources();

  const preStr = JSON.stringify(resourcesPre, null, 2);
  const postStr = JSON.stringify(resourcesPost, null, 2);
  if (preStr !== postStr) {
    throw new Error(`Difference in open resources before openPlugin and after Plugin.close(): 
Before: ${preStr}
After: ${postStr}`);
  }
}

runTestSync();
runTestAsync();

runTestOpCount();
runTestPluginClose();
