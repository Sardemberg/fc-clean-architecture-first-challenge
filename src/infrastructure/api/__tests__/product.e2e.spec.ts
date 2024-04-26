import request from "supertest"
import { app, sequelize } from "../express"

describe("E2E Tests for product use case api routes", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    })

    afterAll(async () => {
        await sequelize.close();
    })
    
    it("Test create product route", async () => {
        const res = await request(app)
        .post("/product")
        .send({
            type: "a",
            name: "product",
            price: 20.60
        });

        expect(res.status).toBe(200)
        expect(res.body.name).toBe("product")
        expect(res.body.price).toBe(20.60)
    })

    it("Test create product route 5XX error", async () => {
        const res = await request(app)
        .post("/product")
        .send({
            type: "a",
        });

        expect(res.status).toBe(500)
    })

    it("Test list product route", async () => {
        let response = await request(app)
        .post("/product")
        .send({
            type: "a",
            name: "product",
            price: 20.60
        });

        expect(response.status).toBe(200)

        response = await request(app)
        .post("/product")
        .send({
            type: "a",
            name: "product2",
            price: 20.61
        });

        expect(response.status).toBe(200)

        response = await request(app)
        .get("/product")
        .send({})

        expect(response.status).toBe(200)
        expect(response.body.products.length).toBe(2)
        expect(response.body.products[0].name).toBe("product")
        expect(response.body.products[1].name).toBe("product2")
        expect(response.body.products[0].price).toBe(20.60)
        expect(response.body.products[1].price).toBe(20.61)
    })
})