const testArray = [1,0,2,3,4,5,2,4,3,2,3,4,5,6]

// Array.from
function unique(arr){
    return Array.from(new Set(arr))
}
//set
function unique(arr){
    return [...new Set(arr)]
}
//还可以更简单的箭头函数版
// let resultArray = arr => [...new Set(arr)]

let resultArray = unique(testArray)
console.log(resultArray)