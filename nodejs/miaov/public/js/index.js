$(function() {
    
    function showHintTip(msg) {
        var hintTip = $('.hint-tip')
        hintTip.fadeIn().html(msg)
        setTimeout(function() {
            hintTip.fadeOut()
        }, 1000)
    }

    $('.toggleLogin').on('click', function() {
        $('#registerBox').hide()
        $('#loginBox').show()
    })
    $('.toggleRegister').on('click', function() {
        $('#registerBox').show()
        $('#loginBox').hide()
    })
    // 注册
    $('.btn-register').on('click', function() {
        var username = $('#registerBox .username').val()
        var password = $('#registerBox .password').val()
        var repassword = $('#registerBox .repassword').val()

        $.ajax({
            type: 'post',
            url: '/api/user/register',
            data: {
                username: username,
                password: password,
                repassword: repassword
            },
            dataType: 'json',
            success: function(data) {
                console.log(data)
                showHintTip(data.msg)
                if (data.code === 0) {
                    setTimeout(function() {
                        $('#registerBox').hide()
                        $('#loginBox').show()
                    }, 1000)
                }
            },
            error: function(err) {
                console.log(err)
            }
        })
    })

    // 登录
    $('.btn-login').on('click', function() {
        var username = $('#loginBox .username').val()
        var password = $('#loginBox .password').val()

        $.ajax({
            type: 'post',
            url: '/api/user/login',
            data: {
                username: username,
                password: password,
            },
            dataType: 'json',
            success: function(data) {
                console.log(data)
                showHintTip(data.msg)
                if (data.code === 0) {
                    window.location.reload()
                }
            },
            error: function(err) {
                console.log(err)
            }
        })
    })

    // 退出登录
    $('.logout').on('click', function() {
        $.ajax({
            type: 'get',
            url: '/api/user/logout',
            dataType: 'json',
            success: function(data) {
                console.log(data)
                if (data.code === 0) {
                  window.location.reload()
                }
            },
            error: function(err) {
                console.log(err)
            }
        })
    })
})