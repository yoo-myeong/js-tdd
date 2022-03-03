const ProductService = require("../product_service_no_di.js");
const ProductClient = require("../product_client.js");

// mock을 사용하는 좋은 경우는 네트워크 상태에 의존하지 않는 테스트코드를 작성할 때이다.

jest.mock("../product_client.js");
describe("ProductService", () => {
  const fetchItems = jest.fn(async () => [
    { item: "milk", available: true },
    { item: "banana", available: false },
  ]);

  ProductClient.mockImplementation(() => {
    return { fetchItems };
  });

  let productService;

  beforeEach(() => {
    productService = new ProductService();
  });

  it("should filter out only available items", async () => {
    const items = await productService.fetchAvailableItems();
    expect(items).toEqual([{ item: "milk", available: true }]);
  });
});
