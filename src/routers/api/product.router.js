
import BaseRouter from "../base.router.js";
import ProductManager from "../../managers/product.manager.js";
import { ADMIN, STANDARD } from "../../constants/roles.constant.js";
import uploader from "../../utils/uploader.js";

export default class ProductRouter extends BaseRouter {
    #productManager;

    constructor() {
        super();
        this.#productManager = new ProductManager();
    }

    initialize() {
        const router = this.getRouter();

        // Define las rutas y asocia las funciones correspondientes
        this.addGetRoute("/", [STANDARD], (req, res) => this.#getAll(req, res));
        this.addGetRoute("/:id", [STANDARD], (req, res) => this.#getById(req, res));
        this.addPostRoute("/", [ADMIN], uploader.single("file"), (req, res) => this.#create(req, res));
        this.addPutRoute("/:id", [ADMIN], uploader.single("file"), (req, res) => this.#update(req, res));
        this.addDeleteRoute("/:id", [ADMIN], (req, res) => this.#delete(req, res));

        // Middleware para manejar errores
        // eslint-disable-next-line no-unused-vars
        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }

    // Maneja la solicitud GET para obtener todos los productos
    async #getAll(req, res) {
        try {
            const productsFound = await this.#productManager.getAll(req.query);
            res.sendSuccess200(productsFound);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud GET para obtener un producto por ID
    async #getById(req, res) {
        try {
            const productFound = await this.#productManager.getOneById(req.params.id);
            res.sendSuccess200(productFound);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud POST para crear un nuevo producto
    async #create(req, res) {
        try {
            const { file } = req;
            const productCreated = await this.#productManager.insertOne(req.body, file?.filename);
            res.sendSuccess201(productCreated);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud PUT para actualizar un producto existente
    async #update(req, res) {
        try {
            const { file } = req;
            const productUpdated = await this.#productManager.updateOneById(req.params.id, req.body, file?.filename);
            res.sendSuccess200(productUpdated);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud DELETE para eliminar un producto por ID
    async #delete(req, res) {
        try {
            const productDeleted = await this.#productManager.deleteOneById(req.params.id);
            res.sendSuccess200(productDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }
}