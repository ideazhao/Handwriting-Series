
//柯里化的定义：接收一部分参数，返回一个函数接收剩余参数，接收足够参数后，执行原函数。
//当柯里化函数接收到足够参数后，就会执行原函数，如何去确定何时达到足够的参数呢？

//有两种思路：

//通过函数的 length 属性，获取函数的形参个数，形参的个数就是所需的参数个数
//在调用柯里化工具函数时，手动指定所需的参数个数
const curry = function (targetFn) {
	return function fn (...rest) {
        console.log('rest',rest)
    	if (targetFn.length === rest.length) {
            return targetFn.apply(null, rest);
        }  else {
            return fn.bind(null, ...rest);
        }
    };
};
// 用法
function add (a, b, c, d) {
    return a + b + c + d;
}
console.log('柯里化：', curry(add)(1)(2)(3)(4)); 
// 柯里化： 10

// 经典面试题

// 实现一个add方法，使计算结果能够满足如下预期：
// add(1)(2)(3) = 6;
// add(1, 2, 3)(4) = 10;
// add(1)(2)(3)(4)(5) = 15;

function addFunc() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = [...arguments];

    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function() {
        _args.push(...arguments);
        return _adder;
    };

    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function () {
        return _args.reduce(function (a, b) {
            return a + b;
        });
    }
    return _adder;
}

console.log(addFunc(1)(2)(3) == 6);



