const express = require('express');
const router = express.Router();

function dateFromStr(dateStr){
  let [dd,mm,yyyy]=dateStr.split('-')
  return new Date(yyyy+'/'+mm+'/'+dd)
}


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(users)
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/email/:email",(req,res)=>{
  const user_filtered=users.filter((user)=>user.email===req.params.email)
  res.send(user_filtered)//This line is to be replaced with actual return value
});
router.get("/lastName/:lastName",(req,res)=>{
  let users_filtered=users.filter((user)=>user.lastName===req.params.lastName)
  res.send(users_filtered)//This line is to be replaced with actual return value
});
router.get("/sort",(req,res)=>{
  let sorted_users=users.sort((a,b)=>{
    let d1=dateFromStr(a.DOB)
    let d2=dateFromStr(b.DOB)
    return d1-d2
  })
  res.send(sorted_users)
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  let user={
    "firstName":req.query.firstName,
    "lastName":req.query.lastName,
    "email":req.query.email,
    "DOB":req.query.DOB
  }
  users.push(user)
  res.send("user added:"+user.firstName)//This line is to be replaced with actual return value
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email=req.params.email
  let users_filtered=users.filter((user)=>user.email===email)
  if (users_filtered.length>0){
    let user_filtered=users_filtered[0]
    if (req.query.firstName)
      user_filtered.firstName=req.query.firstName
    if (req.query.lastName)
      user_filtered.lastName=req.query.lastName
    if (req.query.DOB)
      user_filtered.DOB=req.query.DOB
    if (req.query.email)
      user_filtered.email=req.query.email

    users=users.filter((user)=>user.email!=email)
    users.push(user_filtered)
    res.send(users)
  }
  else{
    res.send("can't find user")
  }

});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email=req.params.email
  users=users.filter((user)=>user.email!=email)
  res.send("user with email "+email+" deleted successfully")
});

module.exports=router;
