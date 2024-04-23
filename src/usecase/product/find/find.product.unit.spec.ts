import ProductFactory from "../../../domain/product/factory/product.factory"
import { FindProductUseCase } from "./find.product.usecase"

const product = ProductFactory.create("a", "product", 20.60)

const repositoryMock = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve({
            name: product.name,
            price: product.price,
            id: product.id
        })),
        update: jest.fn(),
        findAll: jest.fn(),
    }
}

describe("Tests to validate find product use case", () => {
    it("Successfully find", async () => {
        const repository = repositoryMock()
        const findProductUseCase = new FindProductUseCase(repository)

        const output = await findProductUseCase.execute({id: product.id})

        expect(output).toEqual({
            name: "product",
            price: 20.60,
            id: product.id
        })
    })
})