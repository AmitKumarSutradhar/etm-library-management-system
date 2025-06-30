import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const borrowRoutes = express.Router();

borrowRoutes.get('/', async (req: Request, res: Response) => {

    res.status(200).json({
        "success": true,
        "message": "Borrowed books summary retrieved successfully",
        // "data": bookId
    })
})

borrowRoutes.post('/', async (req: Request, res: Response) => {
   const { book: bookId, quantity, dueDate } = req.body;

    const book = await Book.findById(bookId)
    const availableBook = book?.copies ;

    console.log(book?.copies);

    res.status(200).json({
        "success": true,
        "message": "Book borrowed successfully",
        "data": book
    })
})