function New(func) {
    // 1、创建新对象
    let res = {};  
    if (func.prototype !== null) {  
        // 2、将传入的构造函数的原型与新对象之间建立联系
        Object.setPrototypeOf(res,func.prototype)
    }
    // 3、绑定this及传参
    let ret = func.apply(res, Array.from(arguments).slice(1));
    // 如果函数内有返回对象或者函数类型的值，且不为null，则返回此值
    if ((typeof ret === "object" || typeof ret === "function") && ret !== null) {
        return ret;
    }
    // 否则返回新建的对象
    return res;
}
function Person(name,age){
    this.name = name
    this.age = age
    // return []
    // return {
    //     name:'idea',
    //     age:18
    // }
}
var obj = New(Person, 1, 2);
console.log(obj)
