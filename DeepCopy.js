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
    let map = new Map()
    //空对象
    if(!srcObject) return
    // 防止循环引用
    if (map.get(target)) {
        return map.get(target);
    }
    map.set(target, cloneTarget);

    for(let i in srcObject){
        let item = srcObject[i]
        if(Array.isArray(item)){
            // 数组
            tarObject[i] = []
            DeepCopy(item,tarObject[i])
        } else if(item instanceof Object && typeof item != 'function'){
            // 一般对象
            tarObject[i] = {}
            DeepCopy(item,tarObject[i])
        } else {
            // 其他对象
            tarObject[i] = item
        }
    }
}

DeepCopy(srcObject,tarObject)
console.log('tarObject',tarObject)
