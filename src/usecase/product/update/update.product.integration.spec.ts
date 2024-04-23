import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import { InputUpdateProductDto } from "./update.product.dto";

describe("Integration tests for update product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    
    it("Successfully update", async () => {
        const product = ProductFactory.createSimpleProduct("product", 20.60)
        const repository = new ProductRepository()
        await repository.create(product)

        const updateProductUseCase = new UpdateProductUseCase(repository)

        const input: InputUpdateProductDto = {
            id: product.id,
            name: "produto atualizado",
            price: 41.22
        }

        const output = await updateProductUseCase.execute(input)

        expect(output).toEqual({
            id: product.id,
            name: input.name,
            price: input.price
        })
    })
})