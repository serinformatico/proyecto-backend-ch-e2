import CartService from "../services/cart.service.js";

export default class CartController {
    #cartService;

    constructor() {
        this.#cartService = new CartService();
    }

    // Obtener carritos
    async getAll(req, res) {
        try {
            const carts = await this.#cartService.findAll(req.query);
            res.sendSuccess200(carts);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Obtener un carrito por su ID
    async getById(req, res) {
        try {
            const cart = await this.#cartService.findOneById(req.params.id);
            res.sendSuccess200(cart);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Crear un carrito
    async create(req, res) {
        try {
            const cart = await this.#cartService.insertOne(req.body);
            res.sendSuccess201(cart);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Actualizar un carrito existente
    async update(req, res) {
        try {
            const cart = await this.#cartService.updateOneById(req.params.id, req.body);
            res.sendSuccess200(cart);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Eliminar un carrito por su ID
    async delete(req, res) {
        try {
            const cart = await this.#cartService.deleteOneById(req.params.id);
            res.sendSuccess200(cart);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Agregar un producto en un carrito específico
    async addOneProduct(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const cart = await this.#cartService.addOneProduct(cid, pid, quantity ?? 1);
            res.sendSuccess200(cart);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Elimina un producto específico de un carrito
    async removeOneProduct(req, res) {
        try {
            const { cid, pid } = req.params;
            const cart = await this.#cartService.removeOneProduct(cid, pid, 1);
            res.sendSuccess200(cart);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Elimina todos los productos de un carrito específico
    async removeAllProducts(req, res) {
        try {
            const cart = await this.#cartService.removeAllProducts(req.params.cid);
            res.sendSuccess200(cart);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Procesar la compra de un carrito específico
    async processPurchase(req, res) {
        try {
            const cart = await this.#cartService.processPurchase(req.params.cid, req.email);
            res.sendSuccess200(cart);
        } catch (error) {
            res.sendError(error);
        }
    }
}