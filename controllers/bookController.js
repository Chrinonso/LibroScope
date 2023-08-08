const express = require('express');
const Book = require('../models/Books');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const createBook = async (req,res) => {
    req.body.user = req.user.userId;
    
    const book = await Book.create(req.body);
    res.status(StatusCodes.CREATED).json({ book })
};

const getAllBooks = async (req,res) => {
    const book = await Book.find({});
    res.status(StatusCodes.OK).json({ book, count:book.length });
};

const getAllUserBooks = async (req,res) => {
    const {title, author, genre} = req.query;
    
    const queryObject = {
        user:req.user.userId,
    };
        console.log(req.query)
        if(title) {
        queryObject.title = {$regex:title, $options:'i'};
        }
        if(author) {
            queryObject.author = {$regex:author, $options:'i'}
        }
        if(genre) {
            queryObject.genre = {$regex:genre, $options:'i'}
        }

        
    
    
    const book = await Book.find(queryObject);
    res.status(StatusCodes.OK).json({ book, count:book.length});
};

const getSingleBook = async (req,res) => {
    const userId = req.user.userId;
    const { id:bookId } = req.params;

    const book = await Book.findOne({_id:bookId, user:userId});
    if(!book) {
        throw new CustomError.NotFoundError(`there is no book with the ID ${bookId}`);

    }

    res.status(StatusCodes.OK).json({ book })
};

const updateBook = async (req,res) => {
    userId = req.user.userId;
    const {id:bookId} = req.params;
    const book = await Book.findOneAndUpdate({_id:bookId, user:userId}, req.body, {new:true, runValidators:true});
    if(!book) {
        throw new CustomError.NotFoundError(`There is no book with the ID ${bookId}`);
    }

    res.status(StatusCodes.OK).json({ book });
};

const deleteBook = async (req,res) => {
    userId = req.user.userId;
    const  { id:bookId } = req.params;

    const book = await Book.findOneAndDelete({_id:bookId, user:userId});
    if(!book) {
        throw new CustomError.NotFoundError(`No book with ID ${bookId}`);

    }
    res.status(StatusCodes.OK).json({msg: 'Success!!! Book deleted'});
};



module.exports = {
    createBook,
    getAllBooks,
    getAllUserBooks,
    getSingleBook,
    updateBook,
    deleteBook
};