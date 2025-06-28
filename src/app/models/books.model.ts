import mongoose, { model } from 'mongoose';
import { IBooks } from '../interfaces/books.interface';
const { Schema } = mongoose;

const bookSchema = new Schema<IBooks>({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true },
    genre: {
        type: String,
        required: true,
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    },
    isbn: { type: String, required: true },
    description: { type: String, default: '' },
    copies: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
});

export const Book = model<IBooks>("Book", bookSchema)