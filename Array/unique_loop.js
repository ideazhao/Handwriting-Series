const testArray = [1,0,2,3,4,5,2,4,3,2,3,4,5,6]

// 双循环
function unique(arr){
    let result = []
    for(var i = 0;i<=arr.length-1;i++){
        for(var j = 0;j < result.length;j++){
            if(arr[i] === result[j]){
                break
            }
        }
        if(j == result.length){
            result.push(arr[i])
        }
    }
    return result
}

let resultArray = unique(testArray)
console.log(resultArray)
