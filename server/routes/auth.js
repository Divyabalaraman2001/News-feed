const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bycrypt = require('bcryptjs');

const authenticate = require('../middleware/authenticate');

require("../db/connect");

// Registration

router.post('/register', async (req, res) => {
    const { firstName, lastName, userName, email, phone, password, cpassword } = req.body;

    try {
        if (!firstName || !lastName || !userName || !email || !phone || !password || !cpassword) {
            return res.status(422).json({ error: "Details are not entered properly" });
        }
        const response = await User.findOne({ email: email });

        // Email Validation
        if (response) {
            res.status(422).json({ error: "Email is already in use" });
        }
        else if (password != cpassword) {
            res.status(401).json({ error: "Passwords doesn't match" });
        }
        else {
            const user = new User({ firstName, lastName, userName, email, phone, password, cpassword });

            const userSave = await user.save();

            if (userSave) {
                res.status(201).json({ success: "User registered successfully" });

            }
        }

    } catch (error) {
        console.log(error);
    }

});

// Login
router.post('/login', async (req, res) => {

    let token;
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Please enter the details properly" });
        }
        else {
            const user = await User.findOne({ email: email });
            console.log();
            
            const comparePassword = await bycrypt.compare(password, user.password);

            if (user && comparePassword) {
                console.log("User logged in correctly");
                
                token = await user.generateAuthToken();
                console.log(token);
                

                res.cookie('token', token, {
                    expires: new Date(Date.now() + 300000),
                    httpOnly: true
                })


                // console.log(req.cookie);
                
                
                res.status(200).json({ message: "Succesfully logged in" });
            }
            else {
                res.status(400).json({ message: "Invalid Credentials" });
            }

        }
    } catch (error) {
        res.status(404).json({ error: "User not found" });
    }
});

// Profile route
router.get('/profile', authenticate, (req, res) => {
    console.log("This is profile page");
    res.send(req.rootUser);
})
router.get('/logout', (req, res) => {
   res.clearCookie('token', {
        path: '/'
   })
   console.log("User logout");
   res.status(200).send("User logout");
})
module.exports = router;
