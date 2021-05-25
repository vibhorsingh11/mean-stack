const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Reference from mongodb
const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://vibhor:<password>@cluster0.ubtub.mongodb.net/node-angular?retryWrites=true&w=majority", 
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log("Connected to database");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next()
});

app.post("/api/posts", (req,res,next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.get("/api/posts",(req,res,next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: "Posts fetched succesfully!",
            posts: documents
        });
    });
});

module.exports = app;