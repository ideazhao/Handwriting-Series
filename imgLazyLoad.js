//原理：
// 取得所有目标范围内的图片列表DOM
// 页面滚动时执行方法，遍历图片列表，将列表中图片位置小于窗口高度，即已经出现在视口内的图片真实地址加载出来（这里用了自定义属性的dataset做图片地址的存储）
// 执行方法的同时，记录已经加载完毕的图片索引，加载了部分图片之后，将图片列表重置为尚未加载的图片部分
// 执行完卸载事件绑定

let imgList = [...document.querySelectorAll('img')],
length = imgList.length;

function lazyLoad(){
    let count = 0
    return (function(){
        deleteIndexList = [];
        imgList.forEach((img,index)=>{
            let imgPos = img.getBoundingClientRect()
            let innerHeight = window.innerHeight
            if(imgPos.top < innerHeight){
                img.src = img.dataset.src
                deleteIndexList.push(index)
            }
            count++
            if(length == count){
                document.removeEventListener('scroll',lazyLoad)
            }
        })
        imgList = imgList.filter((img,index)=>!deleteIndexList.includes(index))
    })()
}
document.addEventListener('scroll',lazyLoad)