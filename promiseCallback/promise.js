let promise=new Promise((res,rej)=>{
    setTimeout(() => {
        res("promise resolved")
    }, 6000);
})

console.log('before calling promise');
promise.then((successMsg)=>{
    console.log('from callback, '+successMsg)
})

console.log('after calling promise');