function repeat (func, times, wait) {
    return function(content){
        let count = 0
        let interval = setInterval(()=>{
            count++
            func(content)
            if(count === times){
                clearInterval(interval)
            }
        },wait)
    }
} 
function alert(args){
    console.log(args)
}
const repeatFunc = repeat(alert, 4, 3000)
repeatFunc("hellworld")
