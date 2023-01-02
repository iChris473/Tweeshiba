
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    wallet: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },
    
    telegram: String,
    
    resetPasswordToken: String,

    // isAdmin: Boolean
    
}, {timestamps: true})

UserSchema.pre('save', async function(next) {

    if(!this.isModified('password')){
        next()
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();

})

UserSchema.methods.getSignedToken = function(){
    return jwt.sign({
        id: this._id,
        password: this.password
    }, process.env.JWTSECRET, {expiresIn: '9999y'})
}

UserSchema.methods.getResetPasswordToken = function(){

    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    return resetToken;
}

module.exports = mongoose.model("Users", UserSchema)