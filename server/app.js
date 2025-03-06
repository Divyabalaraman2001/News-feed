const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require("cors")


// This is how you require the extern custom module using js
// const User = require('./model/user');

// Dotenv
dotenv.config({path: './.env'});
const port = process.env.PORT;

// Mongoose
require('./db/connect');
app.use(cors({
    origin: 'http://localhost:3000', // Frontend origin
    credentials: true,              // Allow cookies
}));
app.use(express.json());

app.use(cookieParser());

// Express Router
app.use(require('./routes/auth'));
app.use(require('./routes/news'));

///terending/news


app.get('/',(req,res)=>{
    res.send(`
        <h1>server is running  for news feed appliation</h1>
        `)
})



app.listen(port, () => {
    console.log(`Server is listening on => http://localhost:${port}`);
});