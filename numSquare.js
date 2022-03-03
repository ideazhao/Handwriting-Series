//判断一个数能不能被 n 次幂
function numSquare(num,n){
    if(num < n) return false
    while(num >= n){
        if(num % n !== 0){
            return false
        }
        num = num / n
    }
    return true
}
console.log(numSquare(64,4))
