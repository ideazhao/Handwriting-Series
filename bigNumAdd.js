function bigNumAdd(num1,num2){
    let maxLen = Math.max(num1.length,num2.length)
    //前置位补零以使二者长度相等，上下对齐
    num1 = num1.padStart(maxLen,'0')
    num2 = num2.padStart(maxLen,'0')

    let res = '',  //结果
    curNum = 0,  //当前位的数字
    over = 0, // 两位相加超过10的部分，即进位
    sum = 0; //当前位数字相加 + 进位数字 = 当前位总和

    for(let i = num1.length -1;i>=0;i--){
        sum = parseInt(num1[i]) + parseInt(num2[i]) + over
        curNum = sum % 10  //总和取余得当前数
        over = Math.floor(sum / 10)  //总和取商得进位
        res = curNum + res  //当前数拼接得结果
    }
    return res
}
console.log(bigNumAdd("12883927392839810", "23793183088791481382380"))