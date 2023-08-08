const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'please provide name'],

    },
    email: {
        type:String,
        required:[true, 'please provide email'],
        validate: {
            validator:validator.isEmail,
            message: 'Please provide a valid email'
        }
    },
    password: {
        type:String,
        required:[true, 'please provide password'],
        maxLength: 7,

    },
    
},{timestamps: true},);


UserSchema.pre('save', async function () {
    if(!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;

};



module.exports = mongoose.model('User', UserSchema);

