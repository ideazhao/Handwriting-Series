let defer = function(time){
    return new Promise(resolve=>{
        setTimeout(()=>{
            console.log(`${time}ms后执行`)
            resolve(5)
        },time)
    })
}
defer(3000).then(res=>{
    console.log(res)
})