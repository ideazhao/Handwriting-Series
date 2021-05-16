const testArray = [1,0,2,3,4,5,2,4,3,2,3,4,5,6]

// indexOf
function uniqueIndex(arr){
    let result = []
    for(var i = 0;i<=arr.length-1;i++){
        let current = arr[i]
        if(result.indexOf(current) === -1){
            result.push(arr[i])
        }
    }
    return result
}

//includes
function uniqueIncludes(arr){
    let result = []
    for(var i = 0;i<=arr.length-1;i++){
        let current = arr[i]
        if(!result.includes(current)){
            result.push(arr[i])
        }
    }
    return result
}

let resultArray = uniqueIncludes(testArray)
console.log(resultArray)

