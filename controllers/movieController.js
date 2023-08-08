const express = require('express');
const mongoose = require('mongoose');
const Movie = require('../models/Movies');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors')
const { createTokenUser, attachCookiesToResponse } = require('../utils');


const createMovie = async (req,res) => {
    req.body.user = req.user.userId;
    console.log(req.body.user);

    const movie = await Movie.create(req.body);

    res.status(StatusCodes.CREATED).json({movie});
};

const getAllMovies = async (req,res) => {
    const movie = await Movie.find({});
    
    if(!movie) {
        throw new CustomError.NotFoundError(`there is no movie with id ${req.user.userId}`);
    }

    res.status(StatusCodes.OK).json({movie, count:movie.length});
};

const getAllUserMovies = async (req,res) => {
    const { title, genre } = req.query;

    const queryObject = {user:req.user.userId};

    if(title) {
        queryObject.title = {$regex:title, $options:'i'}
    }
    if(genre) {
        queryObject.genre = genre;
    }

    const movie = await Movie.find(queryObject);

    res.status(StatusCodes.OK).json({ movie, count:movie.length });
};



const getSingleMovie = async (req,res) => {
    const userId = req.user.userId;
    
    const {id:movieId} = req.params;

    const movies = await Movie.findOne({
        _id:movieId, 
        user: userId,
    })
    if(!movies) {
        throw new CustomError.NotFoundError(`there is no movie with ID ${movieId}`);
    }

    res.status(StatusCodes.OK).json({ movies });
};



const updateMovie = async (req,res) => {
    const userId = req.user.userId;
    const { id:movieId} = req.params;

    const movie = await Movie.findOneAndUpdate({_id: movieId, user:userId}, req.body, {new:true, runValidators: true});

    if(!movie) {
        throw new CustomError.NotFoundError(`No movie with the ID ${movieId}`);
    }
    res.status(StatusCodes.OK).json({movie})
};

const deleteMovie = async (req,res) => {
    const userId = req.user.userId;
    const { id: movieId } = req.params;

    const movie = await Movie.findOneAndDelete({_id: movieId, user:userId});
    if(!movie) {
        throw new CustomError.BadRequestError(`no movie with the ID ${movieId}`);

    }

    res.status(StatusCodes.OK).json({msg: `movie with ID ${movieId} deleted successfully`});
};

module.exports = {
    createMovie,
    getAllMovies,
    getAllUserMovies,
    getSingleMovie,
    updateMovie,
    deleteMovie
};