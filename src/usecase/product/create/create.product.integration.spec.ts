import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import CreateProductUseCase from "./create.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputCreateProductDTO } from "./create.product.dto";

describe("Integration test to create product use case", () => {
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
    
    it("Successfully creation", async () => {
        const createProductUseCase = new CreateProductUseCase(new ProductRepository())
        
        const input: InputCreateProductDTO = {
            name: "product",
            price: 20.60,
            type: "a"
        } 

        const output = await createProductUseCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: "product",
            price: 20.60,
        })
    })
})