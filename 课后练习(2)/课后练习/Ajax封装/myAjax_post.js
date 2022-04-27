var myAjax = {
    getXhr() {
        return new XMLHttpRequest();
    },

    // ====GET请求封装=======================
    get(url, ...rest) {
        let xhr = this.getXhr();
        // xhr.open('get', url);
        // xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var restLeg = rest.length;
                switch (restLeg) {
                    case 1:
                        rest[0](xhr.responseText);
                        break;
                    case 2:
                        if (rest[1] == 'json') {
                            rest[0](JSON.parse(xhr.responseText));
                        } else if (rest[1] == 'xml') {
                            rest[0](xhr.responseXML);
                        } else if (rest[1] == undefined) {
                            rest[0](xhr.responseText);
                        } else {
                            console.error('请输入正确的数据格式类型')
                        }
                        break;
                    default:
                        console.error('传参个数有误，不支持更多参数')
                }
            }
        };
        xhr.open('get', url);
        xhr.send();
    },

    // ====POST请求封装================
    post(url, ...rest) {

        // 获取请求参数的个数
        var reslng = rest.length;

        var reqData = undefined; // 请求数据初始值
        var backFun = undefined; // 回调函数初始值
        var dataType = undefined; // 返回数据类型初始值

        // 请求数据转义 （若有）
        function convert(data) {
            if ((typeof data) == 'object') {
                reqData = JSON.stringify(data) //转换为字符串
            } else if ((typeof data) == 'string') {
                reqData = data;
            } else {
                console.error('请输入正确的请求参数')
            }
        }

        // 判断调用者传入的参数个数 
        // 根据不同的参数格式和参数位置 做出不同的调整 实现 xx.post(url[,data][,fun][,dataType])
        if (reslng == 1) {
            if ((typeof rest[0]) == 'function') {
                backFun = rest[0];
            } else {
                convert(rest[0]);
            }
        } else if (reslng == 2) {
            if ((typeof rest[0]) == 'function') {
                backFun = rest[0]

                if (rest[1] == 'json' || rest[1] == 'xml') {
                    dataType = rest[1];
                } else {
                    console.log(rest[1])
                    console.error('请输入正确的数据类型格式')
                }
            } else {
                convert(rest[0]);
                if ((typeof rest[1]) == 'function') {
                    backFun = rest[1]
                } else {
                    console.error('请输入正确的回调函数')
                }
            }
        } else if (reslng == 3) {
            convert(rest[0]); //如果是对象形式的话就转换为字符串
            if ((typeof rest[1]) == 'function') {
                backFun = rest[1]
            } else {
                console.error('请输入正确的回调函数')
            }

            if (rest[2] != 'json' || rest[2] != 'xml') {
                console.error('请输入正确的数据类型格式')
            } else {
                dataType = rest[2];
            }
        } else {
            console.error('请输入正确的参数个数')
        }

        let xhr = this.getXhr();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (backFun != undefined) {
                    if (dataType == 'json') {
                        backFun(JSON.parse(xhr.responseText)) //转换为js对象
                    } else if (dataType == 'xml') {
                        backFun(xhr.responseXML);
                    } else {
                        backFun(xhr.responseText); //直接以字符串形式输出
                    }
                }
            }
        }
        xhr.open('post', url);
        xhr.send(reqData);

    }
}