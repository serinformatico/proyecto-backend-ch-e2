import TicketService from "../services/ticket.service.js";

export default class TicketController {
    #ticketService;

    constructor() {
        this.#ticketService = new TicketService();
    }

    // Obtener usuarios
    async getAll(req, res) {
        try {
            const tickets = await this.#ticketService.findAll(req.query);
            res.sendSuccess200(tickets);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Obtener un usuario por su ID
    async getById(req, res) {
        try {
            const ticket = await this.#ticketService.findOneById(req.params.id);
            res.sendSuccess200(ticket);
        } catch (error) {
            res.sendError(error);
        }
    }
}