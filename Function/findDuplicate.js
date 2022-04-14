function findDuplicate(arr,n){
    let arrMultiArr = new Map(),
        resultArr = []
    for(let i = 0; i<arr.length;i++){
        if(!arrMultiArr.has(arr[i])){
            arrMultiArr.set(arr[i],1)
        } else {
            let cur = arrMultiArr.get(arr[i])
            arrMultiArr.set(arr[i],cur + 1)
        }
        if( arrMultiArr.get(arr[i]) > n && resultArr.indexOf(arr[i])==-1){
            resultArr.push(arr[i])
        }
    }
    return resultArr
}

let testArr = [0,0,0,1,1,1,1,3,3,4,5,6]
console.log(findDuplicate(testArr,1))