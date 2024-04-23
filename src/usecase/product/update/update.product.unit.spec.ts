import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductUpdateUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "product", 20.60)

const input = {
  id: product.id,
  name: "product",
  price: 20.60
};

const mockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    const repository = mockRepository();
    const productUpdateUseCase = new ProductUpdateUseCase(repository);

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
