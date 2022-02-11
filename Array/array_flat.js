const sourceArr = [1,2,3,4,[5,[8,9,[0,0]],6]]

//原生flat方法  传入几就解开几层，传入Infinity解开无限层
let targetArr1 = []
targetArr1 = sourceArr.flat(Infinity)
console.log('flat输出',targetArr1)

//递归concat
function flatFunc(arr){
    let targetArr2 = []
    arr.forEach((item)=>{
        if(Array.isArray(item)){
            targetArr2 = targetArr2.concat(flatFunc(item))
        } else {
            targetArr2.push(item)
        }
    })
    return targetArr2
}
console.log('concat输出',flatFunc(sourceArr))