function longestPalindrome(str){
    let longStr = "",
        nowStr = "";
    for(let i = 0;i<str.length;i++){
        nowStr = "";
        for(j = i;j<str.length;j++){
            nowStr+=str.charAt(j)
            if(isPalindrome(nowStr)&&nowStr.length>longStr.length){
                longStr = nowStr
            }
        }   
    }
    return longStr
}

function isPalindrome(str){
    return str ===  str.split(',').reverse().join('')
}

let testStr = 'aaabbcc'
console.log(longestPalindrome(testStr))