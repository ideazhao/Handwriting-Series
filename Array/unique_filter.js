// filter

const testArray = [1,0,2,3,4,5,2,4,3,2,3,4,5,6]

function unique(arr){
    const result = arr.filter((item,index,arr)=>{
        return arr.indexOf(item) === index
    })
    return result
}

let resultArray = unique(testArray)
console.log(resultArray)