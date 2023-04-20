const express = require('express')
const user_handler = require('../router_handler/user')
// 1. 导入 @escook/express-joi
const expressJoi = require('@escook/express-joi')
// 2. 导入验证规则对象，并对该对象解构
const { reg_login_schame } = require('../schame/user')

const router = express.Router()
// 3. 添加验证规则中间件 注册新用户
router.post('/reguser',expressJoi(reg_login_schame), user_handler.reguser )

router.post('/login',expressJoi(reg_login_schame), user_handler.login )

// 导出路由文件
module.exports = router