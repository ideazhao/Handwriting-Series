//先解释一下什么是”防抖“
//抖动，可以最直观地想象一下，如果你点一个按钮，点一次，它抖一下，再点一次，它再抖一下，这看起来没问题
//但如果是一个有交互动作，比如发起请求的按钮，在很短时间内连续点击，但它并不需要被连续触发，只要触发一次，多次触发会发生错误
//这时候就要用到防抖，防抖要做到的就是，不论在规定范围内操作多少次，只触发一次。
//所以，防抖的两要素就是：动作、时间范围
//核心原理就是：检查定时器是否已执行，没到时间就清掉重新计时
function debounce(fn,delay){
    if(typeof fn!= 'function'){
        throw Error('fn不是函数')
    }
    let timer
    return function() {
        let _this = this
        let args = arguments
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(function(){
            fn.apply(_this,args)
        },delay)
    }
}