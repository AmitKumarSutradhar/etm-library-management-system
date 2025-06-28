import express, { Request, Response } from "express";
import { Book } from "../models/books.model";

export const booksRoutes = express.Router();


booksRoutes.get('/', async (req: Request, res: Response) => {
    const books = await Book.find();

    res.status(200).json({
        success: true,
        message: "Book list",
        books: books
    })
})

booksRoutes.post('/api/books', async (req: Request, res: Response) => {
    const body = req.body;
    const book = await Book.create(body);

    res.status(201).json({
        success: true,
        message: "Book created successfully.",
        books: book
    })
})

booksRoutes.get('/api/books/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);

    res.status(200).json({
        success: true,
        message: "Book Information",
        book: book
    })
})

booksRoutes.patch('/api/books/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndDelete(bookId);

    res.status(200).json({
        success: true,
        message: "Book deleted successfully.",
        book: book
    })
})

booksRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndDelete(bookId);

    res.status(200).json({
        success: true,
        message: "Book deleted successfully.",
        book: book
    })
})