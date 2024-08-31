import { Schema, model } from "mongoose";
import { ObjectId } from "bson";
import paginate from "mongoose-paginate-v2";

const ticketSchema = new Schema({
    code: {
        type: String,
        required: [ true, "El código es obligatorio" ],
        default: new ObjectId(), // Establece el código automáticamente
    },
    amount: {
        type: Number,
        required: [ true, "El total es obligatorio" ],
        min: [ 0, "El total debe ser un valor positivo" ],
    },
    purchase: {
        type: Date,
        default: Date.now, // Establece la fecha actual automáticamente
        required: [ true, "La fecha de compra es obligatoria" ],
    },
    purchaser: {
        type: String,
        required: [ true, "El email del comprador es obligatorio" ],
        lowercase: true,
        trim: true,
    },
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    versionKey: false, // Elimina el campo __v de versión
});

// Agrega mongoose-paginate-v2 para habilitar las funcionalidades de paginación.
ticketSchema.plugin(paginate);

const Ticket = model("tickets", ticketSchema);

export default Ticket;