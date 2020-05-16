import { assert } from "../../../std/testing/asserts.ts";
import "./imported.ts";

const eventHandler = (e: Event): void => {
  assert(!e.cancelable);
  console.log(`got ${e.type} event in event handler (main)`);
};

window.addEventListener("load", eventHandler);

window.addEventListener("unload", eventHandler);

window.onload = (e: Event): void => {
  assert(!e.cancelable);
  console.log(`got ${e.type} event in onload function`);
};

window.onunload = (e: Event): void => {
  assert(!e.cancelable);
  console.log(`got ${e.type} event in onunload function`);
};

console.log("log from main");
