import MongoDAO from "./mongodb/mongo.dao.js";
import { MONGODB } from "../constants/dao.constant.js";
import Product from "./mongodb/models/product.model.js";
import Cart from "./mongodb/models/cart.model.js";
import Ticket from "./mongodb/models/ticket.model.js";
import User from "./mongodb/models/user.model.js";

export default class FactoryDAO {
    createProduct(className) {
        if (className === MONGODB) {
            return new MongoDAO(Product);
        }
    }

    createCart(className) {
        if (className === MONGODB) {
            return new MongoDAO(Cart);
        }
    }

    createTicket(className) {
        if (className === MONGODB) {
            return new MongoDAO(Ticket);
        }
    }

    createUser(className) {
        if (className === MONGODB) {
            return new MongoDAO(User);
        }
    }
}