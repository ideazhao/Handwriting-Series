// js中类型判断
// 基本类型可以用typeof
// 而引用类型判断使用typeof都会是object，包括null
// 同什么方法可以检测引用类型呢？ instanceof是其中之一

// 模拟 instanceof
function instance_of(L, R) {
    //如果L是null或者不是引用类型，直接返回
    if(L === null || (typeof L !== 'object' && typeof L !==  'function')) return false
    let RP = R.prototype;  //拿到右表达式的显示原型
    let LP = L.__proto__;  //拿到左表达式的隐式原型
    while(true){
        if(RP !== LP){  
            return false
        } else {
            return true
        }
    }
  }
  

let test = [1,2,3]
let result = instance_of(test,Array)
console.log(result)