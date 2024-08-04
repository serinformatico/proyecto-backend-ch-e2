
import BaseRouter from "../base.router.js";
import CartManager from "../../managers/cart.manager.js";
import { ADMIN, STANDARD, PREMIUM } from "../../constants/roles.constant.js";

export default class CartRouter extends BaseRouter {
    #cartManager;

    constructor() {
        super();
        this.#cartManager = new CartManager();
    }

    initialize() {
        const router = this.getRouter();

        // Define las rutas y asocia las funciones correspondientes
        this.addGetRoute("/", [STANDARD], (req, res) => this.#getAll(req, res));
        this.addGetRoute("/:id", [STANDARD], (req, res) => this.#getById(req, res));
        this.addPostRoute("/", [ PREMIUM, ADMIN ], (req, res) => this.#create(req, res));
        this.addPutRoute("/:id", [PREMIUM], (req, res) => this.#update(req, res));
        this.addDeleteRoute("/:id", [ADMIN], (req, res) => this.#delete(req, res));
        this.addPutRoute("/:cid/products/:pid", [STANDARD], (req, res) => this.#addOneProduct(req, res));
        this.addDeleteRoute("/:cid/products/:pid", [STANDARD], (req, res) => this.#removeOneProduct(req, res));
        this.addDeleteRoute("/:cid/products", [STANDARD], (req, res) => this.#removeAllProducts(req, res));

        // Middleware para manejar errores
        // eslint-disable-next-line no-unused-vars
        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }

    // Maneja la solicitud GET para obtener todos los carritos
    async #getAll(req, res) {
        try {
            const cartsFound = await this.#cartManager.getAll(req.query);
            res.sendSuccess200(cartsFound);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud GET para obtener un carrito por ID
    async #getById(req, res) {
        try {
            const cartFound = await this.#cartManager.getOneById(req.params.id);
            res.sendSuccess200(cartFound);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud POST para crear un nuevo carrito
    async #create(req, res) {
        try {
            const cartCreated = await this.#cartManager.insertOne(req.body);
            res.sendSuccess201(cartCreated);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud PUT para actualizar un carrito existente
    async #update(req, res) {
        try {
            const cartUpdated = await this.#cartManager.updateOneById(req.params.id, req.body);
            res.sendSuccess200(cartUpdated);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud DELETE para eliminar un carrito por ID
    async #delete(req, res) {
        try {
            const cartDeleted = await this.#cartManager.deleteOneById(req.params.id);
            res.sendSuccess200(cartDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud PUT para agregar un producto a una carrito específica
    async #addOneProduct(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const cartUpdated = await this.#cartManager.addOneProduct(cid, pid, quantity ?? 1);
            res.sendSuccess200(cartUpdated);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud DELETE para eliminar un producto específico de una carrito
    async #removeOneProduct(req, res) {
        try {
            const { cid, pid } = req.params;
            const cartDeleted = await this.#cartManager.removeOneProduct(cid, pid, 1);
            res.sendSuccess200(cartDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud DELETE para eliminar todos los productos de una carrito específica
    async #removeAllProducts(req, res) {
        try {
            const cartDeleted = await this.#cartManager.removeAllProducts(req.params.cid);
            res.sendSuccess200(cartDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }
}