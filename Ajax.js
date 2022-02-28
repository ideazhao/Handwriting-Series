function requestMethod(type,url,data,contentType){
    let XHR = new XMLHttpRequest()
    XHR.open(type,url,true)
    XHR.setRequestHeader('Content-type',contentType)
    XHR.send(data)
    XHR.onreadystatechange = function(){
        if(XHR.readyState == 4 && XHR.status == 200){
            // 请求成功返回内容
        }
    }
}
