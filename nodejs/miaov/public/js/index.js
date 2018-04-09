$(function() {
    // 注册
    $('.btn-register').on('click', function() {
        var username = $('.username').val()
        var password = $('.password').val()
        var repassword = $('.repassword').val()

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
            },
            error: function(err) {
                console.log(err)
            }
        })
    })
})