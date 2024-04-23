import { InputCreateProductDTO } from "./create.product.dto"
import CreateProductUseCase from "./create.product.usecase"

const repositoryMock = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find:jest.fn(),
        findAll: jest.fn(),
    }
}

describe('Unit test for create product use case', () => {
    it("Test successfully create", async () => {
        const mockRepository = repositoryMock()
        const createProductUseCase = new CreateProductUseCase(mockRepository)

        const input: InputCreateProductDTO = {
            type: "a",
            name: "product",
            price: 20.60
        }

        const output = await createProductUseCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: "product",
            price: 20.60
        })
    })
})