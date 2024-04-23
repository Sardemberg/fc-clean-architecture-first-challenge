import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { ListProductUseCase } from "./list.product.usecase";

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
        const products = [{
            type: "a",
            name: "product",
            price: 20.60
        }, {
            type: "a",
            "name": "product2",
            price: 20.61
        }]

        products.map(product => ProductFactory.create(
            product.type, product.name, product.price
        ))

        const listProductUseCase = new ListProductUseCase(new ProductRepository())

        const output = await listProductUseCase.execute({})
        
        expect(output.products).toHaveLength(2)
        expect(output.products[0].name).toEqual("product")
        expect(output.products[1].name).toEqual("product2")
        expect(output.products[0].price).toEqual(20.60)
        expect(output.products[1].price).toEqual(20.61)
    })
})