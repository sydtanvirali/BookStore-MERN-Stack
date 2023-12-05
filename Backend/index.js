import express, { request, response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:5173',
//     methodes: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to MERN Stack");
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(()=> {
        console.log('App Connected to Database');
        app.listen(PORT, ()=> {
            console.log(`App is Listening to port: ${PORT}`);
        });     
    })
    .catch((error)=> {
        console.log(error)
    });