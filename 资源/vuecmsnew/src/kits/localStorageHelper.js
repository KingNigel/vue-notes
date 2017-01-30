/*
 localStorage操作js文件
* */

const KEY = 'goods';

// 1.0 根据key获取localStorage中的数据
export function getItem(){
   return JSON.parse(localStorage.getItem(KEY) || '[]');
}

// 2.0 向localStorage 中存储数据
//obj的格式：{goodsid:1,count:1}
export function setItem(obj) {
    //获取老数据
  var arr =  JSON.parse(localStorage.getItem(KEY) || '[]');
    // 追加新数据
    arr.push(obj);
    // 统一将新老数据存储到localStorage中
    localStorage.setItem(KEY,JSON.stringify(arr));
}

//3.0 shopcar.vue组件中的减少一个上数服务
export function subStrictItem(goodsid) {

    //1.0 获取老数据
    var arr =  JSON.parse(localStorage.getItem(KEY) || '[]');

    //2.0 遍历数组
    for(let i=arr.length-1;i>=0;i--){
        //每遍历一个对象的goodsid就和goodsid比对，如果相等则是我们需要的对象
        let tmpObj = arr[i];
        if(tmpObj.goodsid == goodsid) {
            if (tmpObj.count == 1) {
                //从数组中移除这个对象即可
                arr.splice(i, 1);
            }else{
                //将当前数据中的count--
                arr[i].count = arr[i].count - 1;
            }
            //跳出循环保证只修改一个对象的数据
            break;
        }
        }

    // 统一将新老数据存储到localStorage中
    localStorage.setItem(KEY,JSON.stringify(arr));
}

export function removeItem(goodsid){
    //1.0 获取老数据
    var arr =  JSON.parse(localStorage.getItem(KEY) || '[]');
    let newArr = [];
    for(let i=arr.length-1;i>=0;i--){
        if(arr[i].goodsid != goodsid){
            newArr.push(arr[i]);
        }
    }
    // 统一将新老数据存储到localStorage中
    localStorage.setItem(KEY,JSON.stringify(newArr));
}