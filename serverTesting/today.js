module.exports.getDate=()=>{
    let egyTimeStr=new Date().toLocaleString("en-US",{timeZone:"Africa/Cairo"})
    let egyTime=new Date(egyTimeStr)
    return egyTime
}

