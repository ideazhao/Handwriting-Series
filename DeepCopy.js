const srcObject = {
    name:'idea',
    age:20,
    run:function(){
        console.log('I can run')
    },
    numList:[1,2,3]
}

let tarObject = {}

//遍历判断属性是 基本类型还是引用类型，引用类型继续递归处理，基本类型直接赋值
//一个注意点是 Function 类型单独处理
function DeepCopy(srcObject,tarObject){
    if(!srcObject) return
    for(let i in srcObject){
        let item = srcObject[i]
        if(Array.isArray(item)){
            tarObject[i] = []
            DeepCopy(item,tarObject[i])
        } else if(item instanceof Object && typeof item != 'function'){
            tarObject[i] = {}
            DeepCopy(item,tarObject[i])
        } else {
            tarObject[i] = item
        }
    }
}

DeepCopy(srcObject,tarObject)
console.log('tarObject',tarObject)
