import express, { Request, Response } from "express";
import { Book } from "../models/books.model";

export const booksRoutes = express.Router();


booksRoutes.get('/', async (req: Request, res: Response) => {

    const { filter, sortBy = 'createdAt', sort = 'desc', limit = 10 } = req.query;

    const query: { [key: string]: any } = {};
    if (filter) {
        query.genre = { $regex: filter, $options: 'i' };
    }

    const sortOption: { [key: string]: 1 | -1 } = {};
    sortOption[sortBy] = sort === 'desc' ? -1 : 1;

    const limitVal = parseInt(typeof limit === 'string' ? limit : '10', 10);

    const books = await Book.find(query)
        .sort(sortOption)
        .limit(limitVal);

    res.status(200).json({
        "success": true,
        "message": "Books retrieved successfully",
        "data": books
    })
})

booksRoutes.post('/', async (req: Request, res: Response) => {
    const body = req.body;
    const book = await Book.create(body);

    res.status(201).json({
        success: true,
        message: "Book created successfully.",
        books: book
    })
})

booksRoutes.get('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);

    res.status(200).json({
        "success": true,
        "message": "Book retrieved successfully",
        "data": book
    })
})

booksRoutes.put('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId
    const updatedBody = req.body;
    const book = await Book.findByIdAndUpdate(bookId, updatedBody, { new: true, })

    res.status(200).json({
        "success": true,
        "message": "Book updated successfully",
        "data": book
    })
})

booksRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndDelete(bookId);

    res.status(200).json({
        "success": true,
        "message": "Book deleted successfully",
        "data": null
    })
})