import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { FindProductUseCase } from "./find.product.usecase";
import { InputFindProductDTO } from "./find.product.dto";

describe("Integration tests for find product use case", () => {
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
    
    it("Successfully find", async () => {
        const product = ProductFactory.createSimpleProduct("product", 20.60)
        const repository = new ProductRepository()
        await repository.create(product)

        const findProductUseCase = new FindProductUseCase(repository)
        const input: InputFindProductDTO = {
            id: product.id
        }

        const output = await findProductUseCase.execute(input)

        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        })
    })
})