var baseURL = 'http://ajax.frontend.itheima.net';
// 开发环境服务器地址
//拦截所有ajax请求：POST  GIT  ajax
// 处理参数
$.ajaxPrefilter(function(params) {
    // 拼接对应环境的服务器地址
    params.url = baseURL + params.url;
    if (params.url.indexOf("/my/") !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    params.complete = function(res) {
        console.log(res.responseJSON);
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message == '身份认证成功! ') {
            localStorage.removeItem('token');
            location.href = '/index.html';
        }
    }
})