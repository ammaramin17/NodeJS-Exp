const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];
let session_info={}

const isValid = (username)=>{ //returns boolean
  if (username){
    return true
  }
  return false

}

const authenticatedUser = (username,password)=>{ //returns boolean
    let filter=users.filter((user)=>user.username===username && user.password===password)
    if (filter.length>0){
      return true
    }
    return false
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username=req.query.username
  const password=req.query.password
  if (isValid(username) && password){
    if (authenticatedUser(username,password)){
      let token=jwt.sign({data:username},"access",{expiresIn:60*10})
      session_info.token=token
      session_info.username=username
      return res.status(200).send(`Welcome ${username}!`);
    }
    else{
      return res.status(404).json({message: "username or password is incorrect"});
    }
  }
  else{
    return res.status(404).json({message: "unable to login"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const review_text=req.query.review
  const userWhoReviewed=session_info.username
  const isbn=req.params.isbn
  books[isbn]["reviews"][userWhoReviewed]=review_text
  return res.status(200).send(`Thanks for the review, ${userWhoReviewed}!`);
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const userWhoReviewed=session_info.username
  const isbn=req.params.isbn
  delete books[isbn]["reviews"][userWhoReviewed]
  return res.status(200).send(`${userWhoReviewed} deleted his book ${isbn} review`);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.session_info=session_info
