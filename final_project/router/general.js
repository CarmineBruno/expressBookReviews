const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Function to check if the user exists
const doesExist = (username) => {
    let userswithsamename = users.filter((user) => {
      return user.username === username;
    });
    return userswithsamename.length > 0;
  };

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    const myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve()
        },6000)});

    myPromise.then(() => {
        res.send(JSON.stringify(books,null,4));
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve()
        },6000)});

    myPromise.then(() => {
        const isbn = req.params.isbn;
        res.send(books[isbn]); 
       })
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve()
        },6000)});

    myPromise.then(() => {
        const author = req.params.author;
        const booksList = Object.values(books).filter(b=> b.author === author)
        res.send(JSON.stringify(booksList,null,4));
       })
});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve()
        },6000)});

    myPromise.then(() => {
        const title = req.params.title;
        const booksList = Object.values(books).filter(b=> b.title === title)
        res.send(JSON.stringify(booksList,null,4));
       })
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(JSON.stringify(books[isbn].reviews,null,4));
});

module.exports.general = public_users;
