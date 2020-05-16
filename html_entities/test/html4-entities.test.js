import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Html4Entities } from "../mod.js";

const { encode, encodeNonUTF, encodeNonASCII, decode } = Html4Entities;

Deno.test({
  name: "html4 entities > encode",
  fn() {
    assertEquals(encode(""), "");
    assertEquals(encode('<>"&'), "&lt;&gt;&quot;&amp;");
    assertEquals(encode('<>"&©'), "&lt;&gt;&quot;&amp;&copy;");

    assertEquals(encodeNonUTF(""), "");
    assertEquals(encodeNonUTF('<>"&©∆'), "&lt;&gt;&quot;&amp;&copy;&#8710;");

    assertEquals(encodeNonASCII(""), "");
    assertEquals(encodeNonASCII('<>"&©®∆'), '<>"&©®&#8710;');
  }
});

Deno.test({
  name: "html4 entities > decode",
  fn() {
    assertEquals(decode(""), "");
    assertEquals(decode("&lt;&gt;&quot;&amp;"), '<>"&');
    assertEquals(decode("&lt;&gt;&quot;&amp;&acE;&copy;"), '<>"&&acE;©');
    assertEquals(decode("&#60;&#x3C;"), "<<");
  }
});
