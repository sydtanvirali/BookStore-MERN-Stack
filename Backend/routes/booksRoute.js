import express from "express";
import {Book} from "../models/bookModel.js";

const router = express.Router();

// Route for save a new Book
router.post('/', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({message : 'Send all requred fields: title, author, publishYear',})
        };
        const newBook = {
            title : request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);
        return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

// Route for get all Books from Database
router.get('/', async (request, response)=> {
    try {
        const books = await Book.find({});
        return response.status(200).json(books);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

// Route for get all Books from Database by Id
router.get('/:id', async (request, response)=> {
    try {
        const { id } = request.params;
        const books = await Book.findById(id);
        return response.status(200).json(books);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

// Route for Update a Book
router.put('/:id', async (request, response)=> {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({message : 'Send all requred fields: title, author, publishYear',});
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).json({message : 'Book not found'});
        }
        return response.status(200).send({message : 'Book updated successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

// Route for Delete a Book
router.delete('/:id', async (request, response)=> {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message : 'Book not found'});
        }
        return response.status(200).send({message : 'Book delete successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

export default router;