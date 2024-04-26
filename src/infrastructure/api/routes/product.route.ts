import express, {Request, Response} from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import { InputCreateProductDTO } from "../../../usecase/product/create/create.product.dto";
import { ListProductUseCase } from "../../../usecase/product/list/list.product.usecase";
import { InputListProductDTO } from "../../../usecase/product/list/list.product.dto";

export const productRouter = express.Router();

productRouter.post("/", async (req: Request, res: Response) => {
    try {
        const createProductUseCase = new CreateProductUseCase(new ProductRepository())

        const input: InputCreateProductDTO = {
            name: req.body.name,
            price: req.body.price,
            type: req.body.type
        } 

        const output = await createProductUseCase.execute(input)

        res.send(output)
    } catch(err) {
        res.status(500).send(err)
    }
})

productRouter.get("/", async (req: Request, res: Response) => {
    try {
        const listProductUseCase = new ListProductUseCase(new ProductRepository())

        const input: InputListProductDTO = {}

        const output = await listProductUseCase.execute(input)
        
        res.send(output)
    } catch(err) {
        res.status(500).send(err)
    }
})