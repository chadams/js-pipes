import Pipes from "./pipes";

const piper = Pipes({});

describe("Piper Functionality", () => {
  test("should not throw on a bad parse", () => {
    expect(piper({ empty: "test string" }, "${name|uppercase} other")).toBe(
      " other"
    );
  });

  test("supports basic templating", () => {
    expect(piper({ name: "test string" }, "${name}")).toBe("test string");
  });

  test("can convert to uppercase", () => {
    expect(piper({ name: "test string" }, "${name|uppercase}")).toBe(
      "TEST STRING"
    );
  });

  test("can do more than one thing", () => {
    expect(
      piper({ name: "test string" }, "${name|uppercase} > ${name|uppercase}")
    ).toBe("TEST STRING > TEST STRING");
  });

  test("supports deeply nested data", () => {
    expect(
      piper({ user: [{ name: "test string" }] }, "${user[0].name|uppercase}")
    ).toBe("TEST STRING");
  });

  test("supports dates", () => {
    expect(
      piper(
        { start: "2021-03-26T15:32:37-04:00" },
        "${start|date:'MM/DD/YYYY'}"
      )
    ).toBe("03/26/2021");
  });

  test("supports date local format", () => {
    expect(
      piper({ start: "2021-03-26T15:32:37-04:00" }, "${start|date:'llll'}")
    ).toBe("Fri, Mar 26, 2021 3:32 PM");
  });

  test("can handle a switch", () => {
    expect(piper({ yes: true }, "${yes|sw:'happy','sad'}")).toBe("happy");
    expect(piper({ yes: false }, "${yes|sw:'happy','sad'}")).toBe("sad");
  });

  test("supports currency formatting", () => {
    expect(piper({ amount: 1223.33 }, "${amount|currency}")).toBe("$1,223.33");
  });
});
