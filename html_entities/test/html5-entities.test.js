import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Html5Entities } from "../mod.js";

const { encode, encodeNonUTF, encodeNonASCII, decode } = Html5Entities;

Deno.test({
  name: "html5 entities > encode",
  fn() {
    assertEquals(encode(""), "");
    assertEquals(encode('<>"&'), "&lt;&gt;&quot;&amp;");
    assertEquals(encode('<>"&©'), "&lt;&gt;&quot;&amp;&copy;");
    assertEquals(encode("∾̳"), "&acE;");

    assertEquals(encodeNonUTF(""), "");
    assertEquals(encodeNonUTF('<>"&©∆'), "&lt;&gt;&quot;&amp;&copy;&#8710;");

    assertEquals(encodeNonASCII(""), "");
    assertEquals(encodeNonASCII('<>"&©®∆'), '<>"&©®&#8710;');
  }
});

Deno.test({
  name: "html5 entities > decode",
  fn() {
    assertEquals(decode(""), "");
    assertEquals(decode("&Lt;&gt;&quot;&amp;"), '≪>"&');
    assertEquals(decode("&lt;&gt;&quot;&amp;"), '<>"&');
    assertEquals(decode("&LT;&GT;&QUOT;&AMP;"), '<>"&');
    assertEquals(decode("&lt;&gt;&quot;&amp;©"), '<>"&©');
    assertEquals(decode("&lt;&gt;&quot;&amp;&copy;"), '<>"&©');
    assertEquals(decode("&#60;&#x3C;&Aacute;&asdasd;"), "<<Á&asdasd;");
    assertEquals(decode("&acE;"), "∾̳");
    assertEquals(decode("&acE;x"), "∾̳x");
  }
});
