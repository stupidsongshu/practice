const express = require('express')
const url = require('url')
const User = require('../models/User')
const Category = require('../models/Category')
const Content = require('../models/Content')

let router = express.Router()

router.use((req, res, next) => {
    if (!req.userInfo.isAdmin) {
        res.send('对不起，您没有权限进入！')
        return
    }
    next()
})

router.get('/', (req, res, next) => {
    res.render('admin/index.html', {
        userInfo: req.userInfo
    })
})

// 用户管理
router.get('/user', (req, res, next) => {
    /* 
        pageNo   当前页数     默认为第1页
        pageSize 每页显示条数  默认查询1000条
        skip     跳过查询的条数
    */

    let pageNo = 1
    let pageSize = 2
    let qs = url.parse(req.url, true)
    if (qs.query.pageNo !== '' && qs.query.pageNo !== undefined) {
        pageNo = parseInt(qs.query.pageNo);
    }
    if (qs.query.pageSize !== '' && qs.query.pageSize !== undefined) {
        pageSize = parseInt(qs.query.pageSize);
    }

    User.count().then(count => {
        // 总页数
        let pageTotalNo = Math.ceil(count / pageSize)
        // 当前页数不能大于总页数
        pageNo = Math.min(pageNo, pageTotalNo)
        // 当前页数不能小于1
        pageNo = Math.max(pageNo, 1)

        let skip = (pageNo - 1) * pageSize
        User.find().limit(pageSize).skip(skip).then(users => {
            res.render('admin/users.html', {
                users,
                pageNo,
                pageSize,
                count,
                pageTotalNo,
                url: '/admin/user'
            })
        })
    })
})

// 分类首页
router.get('/category', (req, res, next) => {
    /* 
        pageNo   当前页数     默认为第1页
        pageSize 每页显示条数  默认查询1000条
        skip     跳过查询的条数
    */

   let pageNo = 1
   let pageSize = 2
   let qs = url.parse(req.url, true)
   if (qs.query.pageNo !== '' && qs.query.pageNo !== undefined) {
       pageNo = parseInt(qs.query.pageNo);
   }
   if (qs.query.pageSize !== '' && qs.query.pageSize !== undefined) {
       pageSize = parseInt(qs.query.pageSize);
   }

   Category.count().then(count => {
       // 总页数
       let pageTotalNo = Math.ceil(count / pageSize)
       // 当前页数不能大于总页数
       pageNo = Math.min(pageNo, pageTotalNo)
       // 当前页数不能小于1
       pageNo = Math.max(pageNo, 1)

       let skip = (pageNo - 1) * pageSize
       Category.find().sort({_id: -1}).limit(pageSize).skip(skip).then(categories => {
           res.render('admin/category.html', {
               categories,
               pageNo,
               pageSize,
               count,
               pageTotalNo,
               url: '/admin/category'
           })
       })
   })
})

// 分类添加
router.get('/category/add', (req, res, next) => {
    res.render('admin/category_add.html')
})
router.post('/category/add', (req, res, next) => {
    let name = req.body.name || ''
    if (name === '') {
        res.render('admin/error.html', {
            errorMsg: '分类名称不能为空'
        })
        return
    }

    // 判断分类名称是否已注册
    Category.findOne({
        name
    }).then(category => {
        if (category) {
            res.render('admin/error.html', {
                errorMsg: '该分类名称已存在'
            })
            return Promise.reject()
        }

        // 分类名称不存在可以保存
        return new Category({
            name
        }).save()
    }).then((save) => {
        console.log(save)
        res.render('admin/success.html', {
            successMsg: '分类添加成功',
            url: '/admin/category'
        })
    })
})

// 分类更新
router.get('/category/update', (req, res, next) => {
    let id = req.query.id
    Category.findById(id).then(category => {
        if (!category) {
            res.render('admin/error.html', {
                errorMsg: '分类信息不存在'
            })
        } else {
            res.render('admin/category_update.html', {
                category
            })
        }
    })
})
router.post('/category/update', (req, res, next) => {
    let id = req.query.id
    let name = req.body.name || ''

    Category.findById(id).then(category => {
        if (!category) {
            res.render('admin/error.html', {
                errorMsg: '分类信息不存在'
            })
            return Promise.reject()
        } else {
            // 没有修改名称
            if (name === category.name) {
                res.render('admin/success', {
                    successMsg: '分类信息更新成功',
                    url: '/admin/category'
                })
                return Promise.reject()
            } else {
                // 判断即将修改的分类名称在数据库中是否已经存在、
                return Category.findOne({
                    _id: {$ne: id},
                    name
                })
            }
        }
    }).then(sameCategory => {
        if (sameCategory) {
            res.render('admin/error', {
                errorMsg: '分类信息已存在，不允许修改'
            })
            return Promise.reject()
        } else {
            return Category.update({
                _id: id
            }, {
                name
            })
        }
    }).then(() => {
        res.render('admin/success', {
            successMsg: '分类信息更新成功',
            url: '/admin/category'
        })
    })
})

// 分类删除
router.get('/category/delete', (req, res, next) => {
    let id = req.query.id

    Category.findById(id).then(category => {
        if (!category) {
            res.render('admin/error.html', {
                errorMsg: '分类信息不存在'
            })
            return Promise.reject()
        } else {
            return Category.remove({
                _id: id
            })
        }
    }).then(() => {
        res.render('admin/success', {
            successMsg: '分类信息删除成功',
            url: '/admin/category'
        })
    })
})

// 内容首页
router.get('/content', (req, res, next) => {
    /* 
        pageNo   当前页数     默认为第1页
        pageSize 每页显示条数  默认查询1000条
        skip     跳过查询的条数
    */
    let pageNo = 1;
    let pageSize = 2;
    let qs = url.parse(req.url, true)
    if (qs.query.pageNo !== '' && qs.query.pageNo !== undefined) {
        pageNo = parseInt(qs.query.pageNo)
    }
    if (qs.query.pageSize !== '' && qs.query.pageSize !== undefined) {
        pageSize = parseInt(qs.query.pageSize)
    }

    Content.count().then(count => {
        let pageTotalNo = Math.ceil(count / pageSize)
        pageNo = Math.min(pageNo, pageTotalNo)
        pageNo = Math.max(pageNo, 1)

        let skip = (pageNo - 1) * pageSize
        // Content.find().sort({_id: -1}).limit(pageSize).skip(skip).then(contents => {
        //     // 根据category查询相应字段
        //     ;(function itrator(i) {
        //         if (i === contents.length) {
        //             res.render('admin/Content.html', {
        //                 contents,
        //                 pageNo,
        //                 pageSize,
        //                 count,
        //                 pageTotalNo,
        //                 url: '/admin/Content'
        //             })
        //             return
        //         }

        //         Category.findOne(contents[i].category).then(category => {
        //             console.log('category', category)
        //             contents[i].categoryName = category.name
        //             // itrator(i++) // 注意此处巨坑：i++ 是先赋值后自增，会导致无限调用itrator(0)，解决方法1:itrator(++i)，解决方法二:itrator(i+1)
        //             itrator(++i)
        //         })
        //     })(0);
        // })

        Content.find().sort({_id: -1}).limit(pageSize).skip(skip).populate(['category', 'user']).then(contents => {
            res.render('admin/content.html', {
                contents,
                pageNo,
                pageSize,
                count,
                pageTotalNo,
                url: '/admin/content'
            })
        })
    })
})

router.get('/content/add', (req, res, next) => {
    Category.find().sort({_id: -1}).then(categories => {
        res.render('admin/content_add.html', {
            categories
        })
    })
})
router.post('/content/add', (req, res, next) => {
    if (req.body.category === '') {
        res.render('admin/error.html', {
            errorMsg: '所属分类不能为空'
        })
        return
    }
    if (req.body.title === '') {
        res.render('admin/error.html', {
            errorMsg: '内容标题不能为空'
        })
        return
    }

    new Content({
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        user: req.userInfo.id
    }).save().then(content => {
        console.log(content)
        res.render('admin/success.html', {
            successMsg: '内容添加成功',
            url: '/admin/content'
        })
    })
})

router.get('/content/update', (req, res, next) => {
    let contentId = req.query.id || ''
    let categories = []
    Category.find().then(res => {
        categories = res
        console.log(categories)

        return Content.findOne({
            _id: contentId
        }).populate('category')
    }).then(content => {
        console.log(content)
        if (!content) {
            res.render('admin/error.html', {
                errorMsg: '指定内容不存在'
            })
            return Promise.reject()
        } else {
            res.render('admin/content_update.html', {
                categories,
                content
            })
        }
    })
})

router.post('/content/update', (req, res, next) => {
    let contentId = req.query.id || ''

    if (req.body.category === '') {
        res.render('admin/error.html', {
            errorMsg: '所属分类不能为空'
        })
        return
    }
    if (req.body.title === '') {
        res.render('admin/error.html', {
            errorMsg: '内容标题不能为空'
        })
        return
    }

    Content.update({
        _id: contentId
    } ,{
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    }).then(() => {
        res.render('admin/success.html', {
            successMsg: '更新内容成功',
            url: '/admin/content'
        })
    })
})

router.get('/content/delete', (req, res, next) => {
    let id = req.query.id

    Content.remove({
        _id: id
    }).then(() => {
        res.render('admin/success.html', {
            successMsg: '删除内容成功',
            url: '/admin/content'
        })
    })
})

module.exports = router
