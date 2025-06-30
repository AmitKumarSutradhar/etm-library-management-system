import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

export const borrowRoutes = express.Router();

borrowRoutes.get('/', async (req: Request, res: Response) => {

    const summary = await Borrow.aggregate([
        {
            $group: {
                _id: '$book',
                totalQuantity: { $sum: '$quantity' }
            }
        },
        {
            $lookup: {
                from: 'books', // Mongoose uses lowercase, plural collection name by default
                localField: '_id',
                foreignField: '_id',
                as: 'bookDetails'
            }
        },
        {
            $unwind: '$bookDetails'
        },
        {
            $project: {
                _id: 0,
                totalQuantity: 1,
                book: {
                    title: '$bookDetails.title',
                    isbn: '$bookDetails.isbn'
                }
            }
        }
    ]);

    res.status(200).json({
        success: true,
        message: 'Borrowed books summary retrieved successfully',
        data: summary
    });
})

borrowRoutes.post('/', async (req: Request, res: Response) => {
    const { book: bookId, quantity, dueDate } = req.body;

    // if (!bookId || !quantity || !dueDate) {
    //     return res.status(400).json({
    //         "success": false,
    //         "message": 'Missing required fields'
    //     });
    // }

    const updatedBook = await Book.borrowBook(bookId, quantity);

    const borrow = new Borrow({
        book: bookId,
        quantity,
        dueDate,
        borrowDate: new Date()
    });

    await borrow.save();

    res.status(201).json({
        success: true,
        message: 'Book borrowed successfully',
        data: { book: updatedBook, borrow }
    });
})