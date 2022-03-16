function QueryString(){
    //浏览器环境才有location，直接运行会报错
    let qs = location.search.length > 0 ? location.search.substring(1):'',
    args = {};
    const qsList = qs.split('&').map(kv=>kv.split('='))
    for(let item of qsList){
        let name = decodeURIComponent(item[0]),
            value = decodeURIComponent(item[1]);
        if(name.length){
            args[name] = value
        }
    }
    return args
}
console.log(QueryString('?wd=查找&rsv_spt=1&rsv_iqid=0xcb3e'))

//原生API
let searchParams = new URLSearchParams()
searchParams.has('wd')  //true
searchParams.get('wd')  // 查找
searchParams.delete('wd') // ?rsv_spt=1&rsv_iqid=0xcb3e