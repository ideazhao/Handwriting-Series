//模拟apply得先看看apply是什么效果

//定义人
function Person(name,age){
    this.name = name
    this.age = age
    this.sayName = function(){
        console.log(`${this.name}今年${this.age}岁`)
    }
}

// 定义学生
function Student(){
    Person.apply(this,arguments)
}

let student1 = new Student('张三',18)
student1.sayName() //张三今年18岁

//可以看出，此例中Student中什么都没有定义，却可以通过传参来使用姓名属性，且可以调用方法，这得益于Person中的定义
//apply将Person中的属性和方法带到了Student
//由此，我们就可以如下这样模拟apply

Function.prototype.apply_write = function(ctx = window){
    ctx.fn = this
    let result
    if(arguments[1]){
        result = ctx.fn(...arguments[1])
    } else {
        result = ctx.fn()
    }
    delete ctx.fn
    return result
}

//写完之后试一下

function Person2(name){
    this.name = name
    this.sayName = function(){
        console.log(`${this.name}今年多大了`)
    }
}

function Student1(){
    Person2.apply_write(this,arguments)
}

let student2 = new Student1('李四')
student2.sayName()  // 李四今年多大了