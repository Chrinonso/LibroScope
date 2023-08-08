const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'please provide movie title'],
        trim: true,
        maxLength: 20,
    },

    genre:{
        type:String,
        required:[true, 'please provide movie genre'],
        enum: ['action', 'romance', 'comedy','drama','series','animation','thriller'],
    },

    releaseYear: {
        type:Number,
        required:[true, 'please provide release year'],
        
    },

    rating:{
        type:String,
        required:[true, 'please provide rating'],
        maxLength:5,

    },

    description:{
        type:String,
        required:[true, 'please provide product description'],
        maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },

    user:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: [true, 'please provide user'],
    },
},{timestamps: true},);

module.exports = mongoose.model('Movie', MovieSchema );