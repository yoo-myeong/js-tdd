const Calculator = require("../calculator.js");

describe("Calculator", () => {
  let cal;
  beforeEach(() => {
    cal = new Calculator();
  });
  it("inits with 0", () => {
    expect(cal.value).toBe(0);
  });

  // 각각의 테스트는 서로 독립적으로 동작할 수 있도록 한다.
  // 다만, 매번 객체를 생성하기 힘드므로
  // 각 테스트가 돌기 전에 동작하는 코드를 작성할 수 있게 도와주는
  // beforeEach를 사용한다.
  it("sets", () => {
    cal.set(9);

    expect(cal.value).toBe(9);
  });

  it("clear", () => {
    cal.set(9);
    cal.clear();
    expect(cal.value).toBe(0);
  });

  it("adds", () => {
    cal.add(5);
    expect(cal.value).toBe(5);
  });

  it("subtracts", () => {
    cal.subtract(5);
    expect(cal.value).toBe(-5);
  });

  it("multiply", () => {
    cal.set(5);
    cal.multiply(2);
    expect(cal.value).toBe(10);
  });

  describe("divides", () => {
    it("0/0===NaN", () => {
      cal.divide(0);
      expect(cal.value).toBe(NaN);
    });

    it("1/0 === Infinity", () => {
      cal.set(1);
      cal.divide(0);
      expect(cal.value).toBe(Infinity);
    });
  });
});
