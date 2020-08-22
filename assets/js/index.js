$(function() {
        getUaerInfo();
        var layer = layui.layer;
        $('#btnLogout').on('click', function() {
            layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function(index) {
                localStorage.removeItem('token');
                location.href = '/login.html';
                layer.close(index);
            })
        })
    })
    // 获取用户信息（封装到入口函数外）
    // 目的是，后面其他的页面要调用
function getUaerInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function(res) {
            //console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('用户资料获取失败！')
            }
            renderAvatar(res.data)
        }
    })
}
// 用户头像
function renderAvatar(user) {
    // 用户名（昵称优先，没有用username）
    var name = user.nickname || user.username;
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.user-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase();
        $('.user-avatar').show().html(text);
    }
}