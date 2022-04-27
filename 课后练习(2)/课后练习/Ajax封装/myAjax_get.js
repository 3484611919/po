var myAjax = {
    getXhr(){
        return new XMLHttpRequest();
    },
    get(url,...rest){
        let xhr = this.getXhr();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                var restLeg = rest.length;
                switch (restLeg){
                    case 1:
                        rest[0](xhr.responseText);
                        break;
                    case 2:
                        if(rest[1] == 'json'){
                            rest[0](JSON.parse(xhr.responseText));
                        }else if(rest[1] == 'xml'){
                            rest[0](xhr.responseXML);
                        }else if(rest[1] == undefined){
                            rest[0](xhr.responseText);
                        }else{
                            console.error('请输入正确的数据格式类型')
                        }
                        break;
                    default:
                        console.error('传参个数有误，不支持更多参数')
                }
            }
        };
        xhr.open('get',url);
        xhr.send();
    }
}