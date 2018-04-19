var page = 1 // 当前页数
var pages = 0 // 总页数
var limit = 2 // 每页显示条数
var comments = [] // 待分页显示的数组

$.ajax({
    url: '/api/comment',
    type: 'get',
    data: {
        contentId: $('#contentId').val() // 内容id也可以从url取
    },
    success: function(res) {
        console.log(res)
        if (res.code === 0) {
            comments = res.comments.reverse()
            renderComments()
        }
    }
})

$('#btn-addComment').on('click', function() {
    if ($('#comment').val().trim() === '') {
        $('#comment').val('')
        alert('评论不能为空')
        return
    }
    $.ajax({
        url: '/api/comment/add',
        type: 'post',
        data: {
            contentId: $('#contentId').val(),
            comment: $('#comment').val()
        },
        success: function(res) {
            console.log(res)
            if (res.code === 0) {
                $('#comment').val('')
                comments = res.content.comments.reverse()
                renderComments()
            }
        }
    })
})

var $li = $('.pagination li')
$('.pagination').delegate('a', 'click', function() {
    if ($(this).parent().hasClass('prev')) {
        page--
        renderComments()
    } else if ($(this).parent().hasClass('next')) {
        page++
        renderComments()
    }
})

function renderComments() {
    pages = Math.ceil(comments.length / limit)
    if (page <= 1) {
        $li.eq(0).html('<span>没有上一页了</span>')
    } else {
        $li.eq(0).html('<a href="javascript:;">上一页</a>')
    }

    if (page >= pages) {
        $li.eq(2).html('<span>没有下一页了</span>')
    } else {
        $li.eq(2).html('<a href="javascript:;">下一页</a>')
    }

    $li.eq(1).html(page + '/' + pages)

    /* 
     *  page  limit  start  end
     *    1     3      0     3
     *    2     3      3     6
     *    3     3      6     9
     *    ...
    */
    var start = (page - 1) * limit
    // var end   = start + limit // page * limit
    var end   = Math.min(start + limit, comments.length) // 此处需注意循环结束位置不能大于数组长度
    console.log(start, end)

    var html = ''
    // for (var i = 0, len = comments.length; i < len; i ++) {
    //     html += '<li>' +
    //                 '<div>'+ comments[i].username +' <span>'+ new Date(comments[i].time) +'</span></div>' +
    //                 '<p>'+ comments[i].commentContent +'</p>' +
    //                 '<hr>' +
    //             '</li>'
    // }
    for (var i = start; i < end; i ++) {
        html += '<li>' +
                    '<div>'+ comments[i].username +' <span>'+ formatDate(new Date(comments[i].time)) +'</span></div>' +
                    '<p>'+ comments[i].commentContent +'</p>' +
                    '<hr>' +
                '</li>'
    }
    $('#commentList').html(html)
    $('#commentLen span').html(comments.length)
}

function formatDate(t) {
    var time = new Date(t)
    var year  = time.getFullYear()
    var month = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)
    var date  = (time.getDate() + 1) < 10 ? '0' + (time.getDate() + 1) : (time.getDate() + 1)
    var hour  = (time.getHours() + 1) < 10 ? '0' + (time.getHours() + 1) : (time.getHours() + 1)
    var minute= (time.getMinutes() + 1) < 10 ? '0' + (time.getMinutes() + 1) : (time.getMinutes() + 1)
    var second= (time.getSeconds() + 1) < 10 ? '0' + (time.getSeconds() + 1) : (time.getSeconds() + 1)

    return year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second
}
