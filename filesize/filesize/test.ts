import {
  test,
  assertEquals,
} from "../test_deps.ts";
import { filesize, Options } from "./mod.ts";

const kilobit: number = 500;
const edgecase: number = 1023;
const kilobyte: number = 1024;
const petabyte: number = 1125899906842620;
const neg: number = -1024;
const byte: number = 1;
const zero: number = 0;
const huge: number = 10e40;
const small: number = 1 / 8;

test("base2", () => {
  assertEquals(filesize(kilobit), "500 B", "Should be '500 B'");

  assertEquals(
    filesize(kilobit, new Options({ round: 1 })),
    "500 B",
    "Should be '500 B'",
  );

  assertEquals(
    filesize(kilobit, new Options({ round: 1, spacer: "" })),
    "500B",
    "Should be '500B'",
  );

  assertEquals(
    filesize(kilobit, new Options({ unix: true })),
    "500",
    "Should be '500'",
  );

  assertEquals(
    filesize(kilobit, new Options({ round: 1, bits: true })),
    "3.9 Kb",
    "Should be '3.9 Kb'",
  );

  assertEquals(
    filesize(kilobit, new Options({ bits: true })),
    "3.91 Kb",
    "Should be '3.91 Kb'",
  );

  assertEquals(
    filesize(kilobit, new Options({ unix: true, bits: true })),
    "3.9K",
    "Should be '3.9K'",
  );
  // assertEquals(filesize(kilobit, new Descriptor({bits: true, output: "array"}))[0], 3.91, "Should be '3.91'");
  // assertEquals(filesize(kilobit, new Descriptor({bits: true, output: "object"})).value, 3.91, "Should be '3.91'");

  assertEquals(filesize(edgecase), "1023 B", "Should be '1023 B'");

  assertEquals(
    filesize(edgecase, new Options({ round: 1 })),
    "1023 B",
    "Should be '1023 B'",
  );

  assertEquals(filesize(kilobyte), "1 KB", "Should be '1 KB'");

  assertEquals(
    filesize(kilobyte, new Options({ round: 1 })),
    "1 KB",
    "Should be '1 KB'",
  );

  assertEquals(
    filesize(kilobyte, new Options({ round: 1, spacer: "" })),
    "1KB",
    "Should be '1KB'",
  );

  assertEquals(
    filesize(kilobyte, new Options({ unix: true })),
    "1K",
    "Should be '1K'",
  );

  assertEquals(
    filesize(kilobyte, new Options({ bits: true })),
    "8 Kb",
    "Should be '8 Kb'",
  );

  assertEquals(
    filesize(kilobyte, new Options({ round: 1, bits: true })),
    "8 Kb",
    "Should be '8 Kb'",
  );

  assertEquals(
    filesize(kilobyte, new Options({ unix: true, bits: true })),
    "8K",
    "Should be '8K'",
  );

  assertEquals(
    filesize(kilobyte, new Options({ exponent: 0 })),
    "1024 B",
    "Should be '1024 B'",
  );

  assertEquals(
    filesize(kilobyte, new Options({ output: "exponent" })),
    1,
    "Should be '1'",
  );

  assertEquals(filesize(neg), "-1 KB", "Should be '-1 KB'");

  assertEquals(
    filesize(neg, new Options({ round: 1 })),
    "-1 KB",
    "Should be '-1 KB'",
  );

  assertEquals(
    filesize(neg, new Options({ round: 1, spacer: "" })),
    "-1KB",
    "Should be '-1KB'",
  );

  assertEquals(
    filesize(neg, new Options({ unix: true })),
    "-1K",
    "Should be '-1K'",
  );

  assertEquals(
    filesize(neg, new Options({ bits: true })),
    "-8 Kb",
    "Should be '-8 Kb'",
  );

  assertEquals(
    filesize(neg, new Options({ round: 1, bits: true })),
    "-8 Kb",
    "Should be '-8 Kb'",
  );

  assertEquals(
    filesize(neg, new Options({ unix: true, bits: true })),
    "-8K",
    "Should be '-8K'",
  );

  assertEquals(filesize(byte), "1 B", "Should be '1 B'");

  assertEquals(
    filesize(byte, new Options({ round: 1 })),
    "1 B",
    "Should be '1 B'",
  );

  assertEquals(
    filesize(byte, new Options({ round: 1, spacer: "" })),
    "1B",
    "Should be '1B'",
  );

  assertEquals(
    filesize(byte, new Options({ unix: true })),
    "1",
    "Should be '1'",
  );

  assertEquals(
    filesize(byte, new Options({ bits: true })),
    "8 b",
    "Should be '8 b'",
  );

  assertEquals(
    filesize(byte, new Options({ round: 1, bits: true })),
    "8 b",
    "Should be '8 b'",
  );

  assertEquals(
    filesize(byte, new Options({ unix: true, bits: true })),
    "8",
    "Should be '8'",
  );

  assertEquals(filesize(zero), "0 B", "Should be '0 B'");

  assertEquals(
    filesize(zero, new Options({ round: 1 })),
    "0 B",
    "Should be '0 B'",
  );

  assertEquals(
    filesize(zero, new Options({ round: 1, spacer: "" })),
    "0B",
    "Should be '0B'",
  );

  assertEquals(
    filesize(zero, new Options({ unix: true })),
    "0",
    "Should be '0'",
  );

  assertEquals(
    filesize(zero, new Options({ bits: true })),
    "0 b",
    "Should be '0 b'",
  );

  assertEquals(
    filesize(zero, new Options({ round: 1, bits: true })),
    "0 b",
    "Should be '0 b'",
  );

  assertEquals(
    filesize(zero, new Options({ unix: true, bits: true })),
    "0",
    "Should be '0'",
  );

  assertEquals(
    filesize(huge),
    "82718061255302770 YB",
    "Should be '82718061255302770 YB'",
  );

  assertEquals(
    filesize(huge, new Options({ bits: true })),
    "661744490042422100 Yb",
    "Should be '661744490042422100 Yb'",
  );

  assertEquals(filesize(small), "0 B", "Should be '0 B'");

  assertEquals(
    filesize(small, new Options({ bits: true })),
    "1 b",
    "Should be '1 b'",
  );

  // assertEquals(filesize(petabyte), "1 PB", "Should be '1 PB'");
});

test("base10", () => {
  assertEquals(
    filesize(kilobit, new Options({ base: 10 })),
    "500 B",
    "Should be '500 B'",
  );

  assertEquals(
    filesize(kilobit, new Options({ base: 10, round: 1 })),
    "500 B",
    "Should be '500 B'",
  );

  assertEquals(
    filesize(kilobit, new Options({ base: 10, round: 1, spacer: "" })),
    "500B",
    "Should be '500B'",
  );

  assertEquals(
    filesize(kilobit, new Options({ base: 10, unix: true })),
    "500",
    "Should be '500'",
  );

  assertEquals(
    filesize(kilobit, new Options({ base: 10, bits: true })),
    "4 kb",
    "Should be '4 kb'",
  );

  assertEquals(
    filesize(kilobit, new Options({ base: 10, round: 1, bits: true })),
    "4 kb",
    "Should be '4 kb'",
  );

  assertEquals(
    filesize(kilobit, new Options({ base: 10, unix: true, bits: true })),
    "4k",
    "Should be '4k'",
  );

  assertEquals(
    filesize(kilobyte, new Options({ base: 10 })),
    "1.02 kB",
    "Should be '1.02 kB'",
  );

  assertEquals(
    filesize(kilobyte, new Options({ base: 10, round: 1 })),
    "1 kB",
    "Should be '1 kB'",
  );

  assertEquals(
    filesize(kilobyte, new Options({ base: 10, round: 1, spacer: "" })),
    "1kB",
    "Should be '1kB'",
  );

  assertEquals(
    filesize(kilobyte, new Options({ base: 10, unix: true })),
    "1k",
    "Should be '1k'",
  );

  assertEquals(
    filesize(kilobyte, new Options({ base: 10, bits: true })),
    "8.19 kb",
    "Should be '8.19 kb'",
  );

  assertEquals(
    filesize(kilobyte, new Options({ base: 10, round: 1, bits: true })),
    "8.2 kb",
    "Should be '8.2 kb'",
  );

  assertEquals(
    filesize(kilobyte, new Options({ base: 10, unix: true, bits: true })),
    "8.2k",
    "Should be '8.2k'",
  );

  assertEquals(
    filesize(neg, new Options({ base: 10 })),
    "-1.02 kB",
    "Should be '-1.02 kB'",
  );

  assertEquals(
    filesize(neg, new Options({ base: 10, round: 1 })),
    "-1 kB",
    "Should be '-1 kB'",
  );

  assertEquals(
    filesize(neg, new Options({ base: 10, round: 1, spacer: "" })),
    "-1kB",
    "Should be '-1kB'",
  );

  assertEquals(
    filesize(neg, new Options({ base: 10, unix: true })),
    "-1k",
    "Should be '-1k'",
  );

  assertEquals(
    filesize(neg, new Options({ base: 10, bits: true })),
    "-8.19 kb",
    "Should be '-8.19 kb'",
  );

  assertEquals(
    filesize(neg, new Options({ base: 10, round: 1, bits: true })),
    "-8.2 kb",
    "Should be '-8.2 kb'",
  );

  assertEquals(
    filesize(neg, new Options({ base: 10, unix: true, bits: true })),
    "-8.2k",
    "Should be '-8.2k'",
  );

  assertEquals(
    filesize(byte, new Options({ base: 10 })),
    "1 B",
    "Should be '1 B'",
  );

  assertEquals(
    filesize(byte, new Options({ base: 10, round: 1 })),
    "1 B",
    "Should be '1 B'",
  );

  assertEquals(
    filesize(byte, new Options({ base: 10, round: 1, spacer: "" })),
    "1B",
    "Should be '1B'",
  );

  assertEquals(
    filesize(byte, new Options({ base: 10, unix: true })),
    "1",
    "Should be '1'",
  );

  assertEquals(
    filesize(byte, new Options({ base: 10, bits: true })),
    "8 b",
    "Should be '8 b'",
  );

  assertEquals(
    filesize(byte, new Options({ base: 10, round: 1, bits: true })),
    "8 b",
    "Should be '8 b'",
  );

  assertEquals(
    filesize(byte, new Options({ base: 10, unix: true, bits: true })),
    "8",
    "Should be '8'",
  );

  assertEquals(
    filesize(zero, new Options({ base: 10 })),
    "0 B",
    "Should be '0 B'",
  );

  assertEquals(
    filesize(zero, new Options({ base: 10, round: 1 })),
    "0 B",
    "Should be '0 B'",
  );

  assertEquals(
    filesize(zero, new Options({ base: 10, round: 1, spacer: "" })),
    "0B",
    "Should be '0B'",
  );

  assertEquals(
    filesize(zero, new Options({ base: 10, unix: true })),
    "0",
    "Should be '0'",
  );

  assertEquals(
    filesize(zero, new Options({ base: 10, bits: true })),
    "0 b",
    "Should be '0 b'",
  );

  assertEquals(
    filesize(zero, new Options({ base: 10, round: 1, bits: true })),
    "0 b",
    "Should be '0 b'",
  );

  assertEquals(
    filesize(zero, new Options({ base: 10, unix: true, bits: true })),
    "0",
    "Should be '0'",
  );
});

// test("invalid", () => {
//   assertThrows(
//     (): void => {
//       filesize(invld);
//     },
//     Error,
//     "Should match",
//   );
// });

test("symbols", () => {
  assertEquals(
    filesize(byte, new Options({ symbols: { B: "Б" } })),
    "1 Б",
    "Should be '1 Б'",
  );

  assertEquals(
    filesize(kilobyte, new Options({ symbols: { B: "Б" } })),
    "1 KB",
    "Should be '1 KB'",
  );
});

test("bits", () => {
  assertEquals(
    filesize(124, new Options({ bits: true, base: 10 })),
    "992 b",
    "Should be '992 b'",
  );

  assertEquals(
    filesize(125, new Options({ bits: true, base: 10 })),
    "1 kb",
    "Should be '1 kb'",
  );

  assertEquals(
    filesize(126, new Options({ bits: true, base: 10 })),
    "1.01 kb",
    "Should be '1.01 kb'",
  );
});

test("fullform", () => {
  assertEquals(
    filesize(0, new Options({ fullform: true })),
    "0 bytes",
    "Should be '0 bytes'",
  );

  assertEquals(
    filesize(1, new Options({ bits: true, base: 10, fullform: true })),
    "8 bits",
    "Should be '8 bits'",
  );

  assertEquals(
    filesize(1, new Options({ base: 10, fullform: true })),
    "1 byte",
    "Should be '1 byte'",
  );

  assertEquals(
    filesize(kilobyte, new Options({ fullform: true })),
    "1 kilobyte",
    "Should be '1 kilobyte'",
  );

  assertEquals(
    filesize(kilobyte, new Options({ fullform: true, standard: "iec" })),
    "1 kibibyte",
    "Should be '1 kibibyte'",
  );

  assertEquals(
    filesize(
      kilobyte * 1.3,
      new Options({ fullform: true, standard: "iec" }),
    ),
    "1.3 kibibytes",
    "Should be '1.3 kibibytes'",
  );

  assertEquals(
    filesize(0, new Options({ fullform: true, fullforms: ["байт"] })),
    "0 байт",
    "Should be '0 байт'",
  );
});

test("exponent", () => {
  assertEquals(
    filesize(0, new Options({ exponent: 0 })),
    "0 B",
    "Should be '0 B'",
  );

  assertEquals(
    filesize(0, new Options({ exponent: 2 })),
    "0 MB",
    "Should be '0 MB'",
  );
});

test("separator", () => {
  assertEquals(
    filesize(1040, new Options({ separator: "" })),
    "1.02 KB",
    "Should be '1.02 KB'",
  );

  assertEquals(
    filesize(1040, new Options({ separator: "," })),
    "1,02 KB",
    "Should be '1,02 KB'",
  );
});

test("locale", () => {
  assertEquals(
    filesize(1040, new Options({ locale: "" })),
    "1.02 KB",
    "Should be '1.02 KB'",
  );

  assertEquals(
    filesize(1040, new Options({ locale: true })),
    Number(1.02).toLocaleString() + " KB",
    "Should be '" + Number(1.02).toLocaleString() + " KB'",
  );

  assertEquals(
    filesize(1040, new Options({ locale: "de" })),
    Number(1.02).toLocaleString("de") + " KB",
    "Should be '" + Number(1.02).toLocaleString("de") + " KB'",
  );
});

test("localeOptions", () => {
  assertEquals(
    filesize(1024, new Options({ locale: "de" })),
    "1 KB",
    "Should be '1 KB'",
  );

  assertEquals(
    filesize(
      1024,
      new Options({ localeOptions: { minimumFractionDigits: 1 } }),
    ),
    "1 KB",
    "Should be '1 KB'",
  );

  assertEquals(
    filesize(
      1024,
      new Options({
        locale: true,
        localeOptions: { minimumFractionDigits: 1 },
      }),
    ),
    "1 KB",
    "Should be '1 KB'",
  );

  assertEquals(
    filesize(
      1024,
      new Options({
        locale: "de",
        localeOptions: { minimumFractionDigits: 1 },
      }),
    ),
    Number(1).toLocaleString("de", { minimumFractionDigits: 1 }) + " KB",
    "Should be '" +
      Number(1).toLocaleString("de", { minimumFractionDigits: 1 }) + " KB'",
  );
});
