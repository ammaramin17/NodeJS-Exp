const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username=req.query.username
  const password=req.query.password

  if (isValid(username) && password)
  {
    duplicates=users.filter((user)=>user.username===username)
    if (duplicates.length>0){
        return res.status(404).json({message: "User already exists!"});
    }
    else{
        users.push({"username":username,"password":password})
        return res.status(200).json({message: "User "+username+" successfully registered"});
    }
  }
  else
  {
    return res.status(404).json({message: "Unable to register user."});
  }

});

public_users.get('/',function (req, res) {
  return res.send(JSON.stringify(books,null,4))
});



// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn=req.params.isbn
  return res.send(JSON.stringify(books[isbn],null,4))
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author=req.params.author
  var filtered_books_author={}
  keys=Object.keys(books)
  keys.map((key)=>{
    if (books[key]["author"]===author){
        filtered_books_author[key]=books[key]
    }
  })
  res.send(JSON.stringify(filtered_books_author,null,4))
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title=req.params.title
    var filtered_books={}
    keys=Object.keys(books)
    keys.map((key)=>{
      if (books[key]["title"]===title){
          filtered_books[key]=books[key]
      }
    })
    res.send(JSON.stringify(filtered_books,null,4))
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn=req.params.isbn
    return res.send(JSON.stringify(books[isbn]["reviews"],null,4))
});

module.exports.general = public_users;
