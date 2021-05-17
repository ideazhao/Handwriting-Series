// 模拟 bind


Function.prototype.bind = Function.prototype.bind || function(context){  // 这里使用了短路运算，如果函数本身有bind，就直接用
    var me = this  // 既然是绑定this，表面当前的this有归属，把它存起来
    var args = Array.prototype.slice.call(arguments,1);  // 使用数组方法存储参数
    return function bound(){  // bind返回的是个函数
        var innerArgs = Array.prototype.slice.call(arguments)  // 保存bind方法接收的参数
        var finalArgs = args.concat(innerArgs)  //将外部和内部的参数合二为一
        return me.apply(context,finalArgs)  // 使用apply将this绑定到传进来的对象上，并且传入后面的参数
    }
}