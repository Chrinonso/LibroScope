const mongoose = require('mongoose');


const BookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'please provide book title'],
        maxlength:50,
        trim:true
    },
    author:{
        type:String,
        required:[true, 'please provide name of author'],
        trim:true
        
    },

    publicationYear:{
        type:Number,
        required:[true, 'please provide the year book was published'],
    },

    genre:{
        type:String,
        required:[true, 'please provide movie genre'],
        enum: ['romance', 'history','drama','adventure','motivation','General Knowledge', 'others'],
    },

    rating:{
        type:String,
        required:[true, 'please provide rating'],
        maxLength:5,
    },

    description:{
        type:String,
        required:[true, 'please provide description'],
        
    },

    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required: [true, 'please provide user']
    },
},{timestamps:true});

module.exports = mongoose.model('Book', BookSchema);