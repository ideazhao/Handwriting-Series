//节流和防抖是一对好兄弟
//其实如果理解得到位，节流也是某种程度的防抖
//只是防抖会限制执行次数，节流限制的是执行速度
//最形象的例子，车站验票进站，乘客一窝蜂都想进站，但是抱歉，一个个验票，验票的速度是一定的，你能进是能进，但是急不来，等前面的人进去了，你再进。
//两要素是不变的：执行动作、时间范围
//核心原理就是：检查定时器是否已执行，没到时间就返回，到时间了才执行。
//乍一听，和防抖差不多，但是防抖会在检查定时器时清除定时器，导致重新计时，所以，如果一直点击，且两次点击在同一单位时间内，都不算数，但节流是可以一直点击，不清除定时器，到了下一个单位时间内的，就算数了。
function throttle(fn,delay){
    if(typeof fn != 'function'){
        throw Error('fn不是函数')
    }
    let timer
    return function(){
        let _this = this
        let _args = arguments
        if(timer){
            return
        }
        timer = setTimeout(function(){
            fn.apply(_this,_args)
            timer = null
        },delay)
    }
}