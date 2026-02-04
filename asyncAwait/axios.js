const axios=require('axios');
// axios.get('https://www.google.com')
// .then((response)=>{
//     console.log(response.status)
// })
// .catch((err)=>{
//     console.log("error:"+err)
// })

async function getData() {
    try {
        let response=await axios.get('https://www.google.com')
        console.log(response.status)
    } 
    
    catch (error) {
        console.log("error:"+err)
    }
}

getData()