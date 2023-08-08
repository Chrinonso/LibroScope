const express = require('express');
const mongoose = require('mongoose');
const User = require('../Models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors')
const { createTokenUser, attachCookiesToResponse } = require('../utils');



const getAllUsers = async (req,res) => {
    const user = await User.find({}).select('-password');
    res.status(StatusCodes.OK).json({ user });
};

const getSingleUser = async (req,res) => {
    const { id:userId } = req.params;

    const user = await User.findOne({_id:userId}).select('-password');
    if(!user) {
        throw new CustomError.NotFoundError(`No user with the ID ${userId}`);

    };

    res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req,res) => {

    res.status(StatusCodes.OK).json({user:req.user});
};

const updateUser = async (req,res) => {
    const { name,email } = req.body;
    if(!name || !email) {
        throw new CustomError.BadRequestError('please provide correct credentials');

    };

    const user = await User.findOneAndUpdate({_id:req.user.userId}, { name,email }, {new:true, runValidators: true});

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({res, user:tokenUser});

    res.status(StatusCodes.OK).json({ user:tokenUser });

};

const updateUserPassword = async (req,res) => {
    const { oldPassword, newPassword } = req.body;
    if(!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('please provide correct password');

    }
    console.log(req.user);
    const user = await User.findOne({_id:req.user.userId});

    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if(!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('invalid credentials !!!')

    }
    user.password = newPassword;
    await user.save();

    res.status(StatusCodes.OK).json({msg: 'Password changed succesfully!!!!'})
};


module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword 
};