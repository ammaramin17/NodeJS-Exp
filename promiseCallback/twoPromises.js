let promise1=new Promise((res,rej)=>{
    setTimeout(() => {
        res("promise1 resolved")
    }, 6000);
})
let promise2=new Promise((res,rej)=>{
    setTimeout(() => {
        res("promise2 resolved")
    }, 3000);
})

promise1.then((successMsg1)=>{
    
    console.log('from callback, '+successMsg1)
    
    promise2.then((successMsg2)=>{
    console.log('from callback, '+successMsg2)
    })
})
