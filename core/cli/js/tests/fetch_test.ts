// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
import {
  unitTest,
  assert,
  assertEquals,
  assertStrContains,
  assertThrows,
  fail,
} from "./test_util.ts";

unitTest({ perms: { net: true } }, async function fetchProtocolError(): Promise<
  void
> {
  let err;
  try {
    await fetch("file:///");
  } catch (err_) {
    err = err_;
  }
  assert(err instanceof TypeError);
  assertStrContains(err.message, "not supported");
});

unitTest(
  { perms: { net: true } },
  async function fetchConnectionError(): Promise<void> {
    let err;
    try {
      await fetch("http://localhost:4000");
    } catch (err_) {
      err = err_;
    }
    assert(err instanceof Deno.errors.Http);
    assertStrContains(err.message, "error trying to connect");
  }
);

unitTest({ perms: { net: true } }, async function fetchJsonSuccess(): Promise<
  void
> {
  const response = await fetch("http://localhost:4545/cli/tests/fixture.json");
  const json = await response.json();
  assertEquals(json.name, "deno");
});

unitTest(async function fetchPerm(): Promise<void> {
  let err;
  try {
    await fetch("http://localhost:4545/cli/tests/fixture.json");
  } catch (err_) {
    err = err_;
  }
  assert(err instanceof Deno.errors.PermissionDenied);
  assertEquals(err.name, "PermissionDenied");
});

unitTest({ perms: { net: true } }, async function fetchUrl(): Promise<void> {
  const response = await fetch("http://localhost:4545/cli/tests/fixture.json");
  assertEquals(response.url, "http://localhost:4545/cli/tests/fixture.json");
  const _json = await response.json();
});

unitTest({ perms: { net: true } }, async function fetchURL(): Promise<void> {
  const response = await fetch(
    new URL("http://localhost:4545/cli/tests/fixture.json")
  );
  assertEquals(response.url, "http://localhost:4545/cli/tests/fixture.json");
  const _json = await response.json();
});

unitTest({ perms: { net: true } }, async function fetchHeaders(): Promise<
  void
> {
  const response = await fetch("http://localhost:4545/cli/tests/fixture.json");
  const headers = response.headers;
  assertEquals(headers.get("Content-Type"), "application/json");
  assert(headers.get("Server")!.startsWith("SimpleHTTP"));
  const _json = await response.json();
});

unitTest({ perms: { net: true } }, async function fetchBlob(): Promise<void> {
  const response = await fetch("http://localhost:4545/cli/tests/fixture.json");
  const headers = response.headers;
  const blob = await response.blob();
  assertEquals(blob.type, headers.get("Content-Type"));
  assertEquals(blob.size, Number(headers.get("Content-Length")));
});

unitTest({ perms: { net: true } }, async function fetchBodyUsed(): Promise<
  void
> {
  const response = await fetch("http://localhost:4545/cli/tests/fixture.json");
  assertEquals(response.bodyUsed, false);
  assertThrows((): void => {
    // Assigning to read-only property throws in the strict mode.
    // @ts-ignore
    response.bodyUsed = true;
  });
  await response.blob();
  assertEquals(response.bodyUsed, true);
});

// TODO(ry) response.body shouldn't be iterable. Instead we should use
// response.body.getReader().
/*
unitTest({ perms: { net: true } }, async function fetchAsyncIterator(): Promise<
  void
> {
  const response = await fetch("http://localhost:4545/cli/tests/fixture.json");
  const headers = response.headers;
  let total = 0;
  for await (const chunk of response.body) {
    total += chunk.length;
  }

  assertEquals(total, Number(headers.get("Content-Length")));
  const _json = await response.json();
});
*/

unitTest({ perms: { net: true } }, async function responseClone(): Promise<
  void
> {
  const response = await fetch("http://localhost:4545/cli/tests/fixture.json");
  const response1 = response.clone();
  assert(response !== response1);
  assertEquals(response.status, response1.status);
  assertEquals(response.statusText, response1.statusText);
  const u8a = new Uint8Array(await response.arrayBuffer());
  const u8a1 = new Uint8Array(await response1.arrayBuffer());
  for (let i = 0; i < u8a.byteLength; i++) {
    assertEquals(u8a[i], u8a1[i]);
  }
});

unitTest({ perms: { net: true } }, async function fetchEmptyInvalid(): Promise<
  void
> {
  let err;
  try {
    await fetch("");
  } catch (err_) {
    err = err_;
  }
  assert(err instanceof URIError);
});

unitTest(
  { perms: { net: true } },
  async function fetchMultipartFormDataSuccess(): Promise<void> {
    const response = await fetch(
      "http://localhost:4545/cli/tests/subdir/multipart_form_data.txt"
    );
    const formData = await response.formData();
    assert(formData.has("field_1"));
    assertEquals(formData.get("field_1")!.toString(), "value_1 \r\n");
    assert(formData.has("field_2"));
    /* TODO(ry) Re-enable this test once we bring back the global File type.
  const file = formData.get("field_2") as File;
  assertEquals(file.name, "file.js");
  */
    // Currently we cannot read from file...
  }
);

unitTest(
  { perms: { net: true } },
  async function fetchURLEncodedFormDataSuccess(): Promise<void> {
    const response = await fetch(
      "http://localhost:4545/cli/tests/subdir/form_urlencoded.txt"
    );
    const formData = await response.formData();
    assert(formData.has("field_1"));
    assertEquals(formData.get("field_1")!.toString(), "Hi");
    assert(formData.has("field_2"));
    assertEquals(formData.get("field_2")!.toString(), "<Deno>");
  }
);

unitTest(
  {
    perms: { net: true },
  },
  async function fetchWithRedirection(): Promise<void> {
    const response = await fetch("http://localhost:4546/"); // will redirect to http://localhost:4545/
    assertEquals(response.status, 200);
    assertEquals(response.statusText, "OK");
    assertEquals(response.url, "http://localhost:4545/");
    const body = await response.text();
    assert(body.includes("<title>Directory listing for /</title>"));
  }
);

unitTest(
  {
    perms: { net: true },
  },
  async function fetchWithRelativeRedirection(): Promise<void> {
    const response = await fetch("http://localhost:4545/cli/tests"); // will redirect to /cli/tests/
    assertEquals(response.status, 200);
    assertEquals(response.statusText, "OK");
    const body = await response.text();
    assert(body.includes("<title>Directory listing for /cli/tests/</title>"));
  }
);

unitTest(
  {
    // FIXME(bartlomieju):
    // The feature below is not implemented, but the test should work after implementation
    ignore: true,
    perms: { net: true },
  },
  async function fetchWithInfRedirection(): Promise<void> {
    const response = await fetch("http://localhost:4549/cli/tests"); // will redirect to the same place
    assertEquals(response.status, 0); // network error
  }
);

unitTest(
  { perms: { net: true } },
  async function fetchInitStringBody(): Promise<void> {
    const data = "Hello World";
    const response = await fetch("http://localhost:4545/echo_server", {
      method: "POST",
      body: data,
    });
    const text = await response.text();
    assertEquals(text, data);
    assert(response.headers.get("content-type")!.startsWith("text/plain"));
  }
);

unitTest(
  { perms: { net: true } },
  async function fetchRequestInitStringBody(): Promise<void> {
    const data = "Hello World";
    const req = new Request("http://localhost:4545/echo_server", {
      method: "POST",
      body: data,
    });
    const response = await fetch(req);
    const text = await response.text();
    assertEquals(text, data);
  }
);

unitTest(
  { perms: { net: true } },
  async function fetchInitTypedArrayBody(): Promise<void> {
    const data = "Hello World";
    const response = await fetch("http://localhost:4545/echo_server", {
      method: "POST",
      body: new TextEncoder().encode(data),
    });
    const text = await response.text();
    assertEquals(text, data);
  }
);

unitTest(
  { perms: { net: true } },
  async function fetchInitURLSearchParamsBody(): Promise<void> {
    const data = "param1=value1&param2=value2";
    const params = new URLSearchParams(data);
    const response = await fetch("http://localhost:4545/echo_server", {
      method: "POST",
      body: params,
    });
    const text = await response.text();
    assertEquals(text, data);
    assert(
      response.headers
        .get("content-type")!
        .startsWith("application/x-www-form-urlencoded")
    );
  }
);

unitTest({ perms: { net: true } }, async function fetchInitBlobBody(): Promise<
  void
> {
  const data = "const a = 1";
  const blob = new Blob([data], {
    type: "text/javascript",
  });
  const response = await fetch("http://localhost:4545/echo_server", {
    method: "POST",
    body: blob,
  });
  const text = await response.text();
  assertEquals(text, data);
  assert(response.headers.get("content-type")!.startsWith("text/javascript"));
});

unitTest(
  { perms: { net: true } },
  async function fetchInitFormDataBody(): Promise<void> {
    const form = new FormData();
    form.append("field", "value");
    const response = await fetch("http://localhost:4545/echo_server", {
      method: "POST",
      body: form,
    });
    const resultForm = await response.formData();
    assertEquals(form.get("field"), resultForm.get("field"));
  }
);

unitTest({ perms: { net: true } }, async function fetchUserAgent(): Promise<
  void
> {
  const data = "Hello World";
  const response = await fetch("http://localhost:4545/echo_server", {
    method: "POST",
    body: new TextEncoder().encode(data),
  });
  assertEquals(response.headers.get("user-agent"), `Deno/${Deno.version.deno}`);
  await response.text();
});

// TODO(ry) The following tests work but are flaky. There's a race condition
// somewhere. Here is what one of these flaky failures looks like:
//
// unitTest fetchPostBodyString_permW0N1E0R0
// assertEquals failed. actual =   expected = POST /blah HTTP/1.1
// hello: World
// foo: Bar
// host: 127.0.0.1:4502
// content-length: 11
// hello world
// Error: actual:  expected: POST /blah HTTP/1.1
// hello: World
// foo: Bar
// host: 127.0.0.1:4502
// content-length: 11
// hello world
//     at Object.assertEquals (file:///C:/deno/js/testing/util.ts:29:11)
//     at fetchPostBodyString (file

function bufferServer(addr: string): Deno.Buffer {
  const [hostname, port] = addr.split(":");
  const listener = Deno.listen({
    hostname,
    port: Number(port),
  }) as Deno.Listener;
  const buf = new Deno.Buffer();
  listener.accept().then(async (conn: Deno.Conn) => {
    const p1 = buf.readFrom(conn);
    const p2 = conn.write(
      new TextEncoder().encode(
        "HTTP/1.0 404 Not Found\r\nContent-Length: 2\r\n\r\nNF"
      )
    );
    // Wait for both an EOF on the read side of the socket and for the write to
    // complete before closing it. Due to keep-alive, the EOF won't be sent
    // until the Connection close (HTTP/1.0) response, so readFrom() can't
    // proceed write. Conversely, if readFrom() is async, waiting for the
    // write() to complete is not a guarantee that we've read the incoming
    // request.
    await Promise.all([p1, p2]);
    conn.close();
    listener.close();
  });
  return buf;
}

unitTest(
  {
    // FIXME(bartlomieju)
    ignore: true,
    perms: { net: true },
  },
  async function fetchRequest(): Promise<void> {
    const addr = "127.0.0.1:4501";
    const buf = bufferServer(addr);
    const response = await fetch(`http://${addr}/blah`, {
      method: "POST",
      headers: [
        ["Hello", "World"],
        ["Foo", "Bar"],
      ],
    });
    assertEquals(response.status, 404);
    assertEquals(response.headers.get("Content-Length"), "2");

    const actual = new TextDecoder().decode(buf.bytes());
    const expected = [
      "POST /blah HTTP/1.1\r\n",
      "hello: World\r\n",
      "foo: Bar\r\n",
      `host: ${addr}\r\n\r\n`,
    ].join("");
    assertEquals(actual, expected);
  }
);

unitTest(
  {
    // FIXME(bartlomieju)
    ignore: true,
    perms: { net: true },
  },
  async function fetchPostBodyString(): Promise<void> {
    const addr = "127.0.0.1:4502";
    const buf = bufferServer(addr);
    const body = "hello world";
    const response = await fetch(`http://${addr}/blah`, {
      method: "POST",
      headers: [
        ["Hello", "World"],
        ["Foo", "Bar"],
      ],
      body,
    });
    assertEquals(response.status, 404);
    assertEquals(response.headers.get("Content-Length"), "2");

    const actual = new TextDecoder().decode(buf.bytes());
    const expected = [
      "POST /blah HTTP/1.1\r\n",
      "hello: World\r\n",
      "foo: Bar\r\n",
      `host: ${addr}\r\n`,
      `content-length: ${body.length}\r\n\r\n`,
      body,
    ].join("");
    assertEquals(actual, expected);
  }
);

unitTest(
  {
    // FIXME(bartlomieju)
    ignore: true,
    perms: { net: true },
  },
  async function fetchPostBodyTypedArray(): Promise<void> {
    const addr = "127.0.0.1:4503";
    const buf = bufferServer(addr);
    const bodyStr = "hello world";
    const body = new TextEncoder().encode(bodyStr);
    const response = await fetch(`http://${addr}/blah`, {
      method: "POST",
      headers: [
        ["Hello", "World"],
        ["Foo", "Bar"],
      ],
      body,
    });
    assertEquals(response.status, 404);
    assertEquals(response.headers.get("Content-Length"), "2");

    const actual = new TextDecoder().decode(buf.bytes());
    const expected = [
      "POST /blah HTTP/1.1\r\n",
      "hello: World\r\n",
      "foo: Bar\r\n",
      `host: ${addr}\r\n`,
      `content-length: ${body.byteLength}\r\n\r\n`,
      bodyStr,
    ].join("");
    assertEquals(actual, expected);
  }
);

unitTest(
  {
    perms: { net: true },
  },
  async function fetchWithManualRedirection(): Promise<void> {
    const response = await fetch("http://localhost:4546/", {
      redirect: "manual",
    }); // will redirect to http://localhost:4545/
    assertEquals(response.status, 0);
    assertEquals(response.statusText, "");
    assertEquals(response.url, "");
    assertEquals(response.type, "opaqueredirect");
    try {
      await response.text();
      fail(
        "Reponse.text() didn't throw on a filtered response without a body (type opaqueredirect)"
      );
    } catch (e) {
      return;
    }
  }
);

unitTest(
  {
    perms: { net: true },
  },
  async function fetchWithErrorRedirection(): Promise<void> {
    const response = await fetch("http://localhost:4546/", {
      redirect: "error",
    }); // will redirect to http://localhost:4545/
    assertEquals(response.status, 0);
    assertEquals(response.statusText, "");
    assertEquals(response.url, "");
    assertEquals(response.type, "error");
    try {
      await response.text();
      fail(
        "Reponse.text() didn't throw on a filtered response without a body (type error)"
      );
    } catch (e) {
      return;
    }
  }
);

unitTest(function responseRedirect(): void {
  const redir = Response.redirect("example.com/newLocation", 301);
  assertEquals(redir.status, 301);
  assertEquals(redir.statusText, "");
  assertEquals(redir.url, "");
  assertEquals(redir.headers.get("Location"), "example.com/newLocation");
  assertEquals(redir.type, "default");
});

unitTest(function responseConstructionHeaderRemoval(): void {
  const res = new Response(
    "example.com",
    200,
    "OK",
    [["Set-Cookie", "mysessionid"]],
    -1,
    false,
    "basic",
    null
  );
  assert(res.headers.get("Set-Cookie") != "mysessionid");
});
