// 1.导入中间件
const express = require('express')
// 1. 导入 @escook/express-joi
const expressJoi = require('@escook/express-joi')
// 2. 导入验证规则对象，并对该对象解构
const { update_userInfo_schame, update_password_schame,update_avatar_schame } = require('../schame/userInfo')
// 2.注册路由
const router = express.Router()
const userInfo_handle = require('../router_handler/userInfo')
// 3.使用路由定义接口
router.get('/userinfo',userInfo_handle.getUserInfo)
// 修改用户的基本信息
router.post('/userinfo',expressJoi(update_userInfo_schame),userInfo_handle.updateUserInfo)
// 重置密码的接口
router.post('/updatepwd',expressJoi(update_password_schame),userInfo_handle.updatePassword)
// 更新用户头像
router.post('/update/avatar',expressJoi(update_avatar_schame),userInfo_handle.updateAvatar)
// 4.抛出路由
module.exports = router