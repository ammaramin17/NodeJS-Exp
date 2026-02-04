const axios=require('axios');

const req=axios.get("https://raw.githubusercontent.com/ibm-developer-skills-network/lkpho-Cloud-applications-with-Node.js-and-React/master/CD220Labs/async_callback/courseDetails.json")

req.then((resp)=>{
    let details=resp.data;
    console.log(JSON.stringify(details,null,4));
})
.catch((err)=>{
    console.log("error:"+err)
})