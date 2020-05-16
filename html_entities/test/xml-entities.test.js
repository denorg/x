import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { XmlEntities } from "../mod.js";

const { encode, encodeNonUTF, encodeNonASCII, decode } = XmlEntities;

Deno.test({
  name: "xml entities > encode",
  fn() {
    assertEquals(encode(""), "");
    assertEquals(encode("<>\"&'"), "&lt;&gt;&quot;&amp;&apos;");
    assertEquals(encode('<>"&©'), "&lt;&gt;&quot;&amp;©");

    assertEquals(encodeNonUTF(""), "");
    assertEquals(encodeNonUTF('<>"&©®'), "&lt;&gt;&quot;&amp;&#169;&#174;");

    assertEquals(encodeNonASCII(""), "");
    assertEquals(encodeNonASCII('<>"&©®'), '<>"&©®');
  }
});

Deno.test({
  name: "xml entities > decode",
  fn() {
    assertEquals(decode(""), "");
    assertEquals(decode("&lt;&gt;&quot;&amp;&apos;"), "<>\"&'");
    assertEquals(decode("&lt;&gt;&quot;&amp;©"), '<>"&©');
    assertEquals(decode("&lt;&gt;&quot;&amp;&copy;&#8710;"), '<>"&&copy;∆');
  }
});
