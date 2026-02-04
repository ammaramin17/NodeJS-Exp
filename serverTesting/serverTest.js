let http=require('http');
let date=require('./today')
const port=8080
const server=http.createServer((req,res)=>{
    res.writeHead(200);
    res.end("200 Ok, also today is "+date.getDate())
});
server.listen(port);
console.log("server listening on port "+port+"...")
