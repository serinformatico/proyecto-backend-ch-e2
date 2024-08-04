import BaseRouter from "./base.router.js";
import ProductManager from "../managers/product.manager.js";

export default class ProductViewRouter extends BaseRouter {
    #productManager;

    constructor() {
        super();
        this.#productManager = new ProductManager();
        this.initialize();
    }

    initialize() {
        const router = this.getRouter();

        // Define las rutas y asocia las funciones correspondientes
        this.addGetRoute("/", (req, res) => this.#getTemplateHome(req, res));

        // Middleware de manejo de errores
        // eslint-disable-next-line no-unused-vars
        router.use((error, req, res, next) => {
            res.sendError(error);
        });
    }

    // Maneja la solicitud GET para la página de inicio
    #getTemplateHome(req, res) {
        res.status(200).render("home", { title: "Inicio" });
    }
}