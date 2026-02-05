const express = require('express');
const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{ 
  return res.send(friends)
});

// GET by specific ID request: Retrieve a single friend with email ID
router.post("/email",(req,res)=>{
  let filtered_friend=friends[req.body.email]
  res.send(filtered_friend)

});


// POST request: Add a new friend
router.post("/",(req,res)=>{
  if (req.body.email){
    friends[req.body.email]={
        "firstName":req.body.firstName,
        "lastName":req.body.lastName,
        "DOB":req.body.DOB
    }
  }
  res.json(`the user ${req.body.firstName} has been added!`)
});


// PUT request: Update the details of a friend with email id
router.post("/email/update", (req, res) => {
  const email=req.body.email
  let friend=friends[email]
  if (friend){
    if (req.body.firstName){
        friend["firstName"]=req.body.firstName
    }
    if (req.body.lastName){
        friend["lastName"]=req.body.lastName
    }
    if (req.body.DOB){
        friend["DOB"]=req.body.DOB
    }
    friends[email]=friend
    res.json(`friend with email ${email} updated successfully!`)
  }
  else{
    res.json("can't find friend")
  }
});


// DELETE request: Delete a friend by email id
router.post("/email/delete", (req, res) => {
  const email=req.body.email
  if (email){
    delete friends[email]
  }
  res.json(`friend with email ${email} deleted successfully!`)
});

module.exports=router;
