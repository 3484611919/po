function temp(id, data) {
    var str = document.getElementById(id).innerHTML;
    var pattern = /{{\s*([a-zA-z]+)\s*}}/
    var re = null;
    while (re = pattern.exec(str)) {
        str = str.replace(re[0], data[re[1]])
    }
    return str;
}