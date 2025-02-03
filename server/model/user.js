const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

// Hashing the password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bycrypt.hash(this.password, 12);
        this.cpassword = await bycrypt.hash(this.cpassword, 12)
    }
    next();
});

// Generating authentication token
userSchema.methods.generateAuthToken = async function() {
    try {
        let token =  jwt.sign({_id: this._id},"seceretkey")

        console.log("ghhhggghg",token);
        
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}


const User = mongoose.model('USERS', userSchema);

module.exports = User;