import ProductFactory from "../../../domain/product/factory/product.factory"
import { OutputListProductDTO } from "./list.product.dto"
import { ListProductUseCase } from "./list.product.usecase"

const expectedOutput = [
    ProductFactory.create("a", "product", 20.60),
    ProductFactory.create("a", "product2", 20.61)
]

const repositoryMock = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    }
}

describe("Tests for list product use case", () => {
    it("List successfully", async () => {
        const repository = repositoryMock()
        const listProductUseCase = new ListProductUseCase(repository)
        const output: OutputListProductDTO = await listProductUseCase.execute({})
        
        expect(output.products).toHaveLength(2)
        expect(output.products[0].name).toEqual("product")
        expect(output.products[1].name).toEqual("product2")
        expect(output.products[0].price).toEqual(20.60)
        expect(output.products[1].price).toEqual(20.61)
    })
})