const ProductService = require("../product_service.js");
const StubProductClient = require("./stub_product_client");

describe("ProductSErvice - stub", () => {
  let productService;

  beforeEach(() => {
    productService = new ProductService(new StubProductClient());
  });

  it("should filter out only available items", async () => {
    const items = await productService.fetchAvailableItems();
    expect(items).toEqual([{ item: "milk", available: true }]);
  });
});
