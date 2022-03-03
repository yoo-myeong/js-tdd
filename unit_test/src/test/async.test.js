const fetchProduct = require("../async.js");

describe("Async", () => {
  it("async - done", (done) => {
    // fetchProduct().then((item) => {
    //   expect(item).toEqual({ item: "Chocolate", price: 200 });
    // });
    fetchProduct().then((item) => {
      expect(item).toEqual({ item: "Milk", price: 200 });
      done();
    });
  });

  it("async - return", () => {
    return fetchProduct().then((item) => {
      expect(item).toEqual({ item: "Milk", price: 200 });
    });
  });

  // 주석처리된 테스트 코드는 item 값이 다르지만 테스트에 통과한다.
  // it은 비동기를 기다리지않는다.
  // - 끝나는 시점('done')을 명시해주기
  // - 비동기함수를 return 하기
  // 위 방법으로 비동기 테스트코드를 작성할 수 있다.

  it("async - await", async () => {
    const result = await fetchProduct();
    expect(result).toEqual({ item: "Milk", price: 200 });
  });
  // 이처럼 await를 사용하고 싶다면 콜백함수앞에 async를 선언해주는 방법도 있다.

  // 프로미스의 결과 상태에 따른 테스트코드를 작성할 수도 있다.
  it("async - resolves", () => {
    return expect(fetchProduct()).resolves.toEqual({
      item: "Milk",
      price: 200,
    });
  });

  it("async - reject", () => {
    return expect(fetchProduct("error")).rejects.toBe("network error");
  });
});
