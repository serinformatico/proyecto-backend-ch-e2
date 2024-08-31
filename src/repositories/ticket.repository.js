import FactoryDAO from "../daos/factory.dao.js";
import TicketDTO from "../dtos/ticket.dto.js";
import { MONGODB } from "../constants/dao.constant.js";
import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";

export default class TicketRepository {
    #ticketDAO;
    #ticketDTO;

    constructor() {
        const factory = new FactoryDAO(); // Uso del patrón "Factory Method"
        this.#ticketDAO = factory.createTicket(MONGODB);
        this.#ticketDTO = new TicketDTO();
    }

    // Obtener carritos aplicando filtros
    async findAll(params) {
        const tickets = await this.#ticketDAO.findAll({}, params);
        const ticketsDTO = tickets?.docs?.map((ticket) => this.#ticketDTO.fromModel(ticket));
        tickets.docs = ticketsDTO;

        return tickets;
    }

    // Obtener un carrito por su ID
    async findOneById(id) {
        const ticket = await this.#ticketDAO.findOneById(id);
        if (!ticket) throw new Error(ERROR_NOT_FOUND_ID);

        return this.#ticketDTO.fromModel(ticket);
    }

    // Crea o actualiza un carrito
    async save(data) {
        const ticketDTO = this.#ticketDTO.fromData(data);
        const ticket = await this.#ticketDAO.save(ticketDTO);
        return this.#ticketDTO.fromModel(ticket);
    }

    // Eliminar un carrito por su ID
    async deleteOneById(id) {
        const ticket = await this.findOneById(id);
        await this.#ticketDAO.deleteOneById(id);
        return ticket;
    }
}