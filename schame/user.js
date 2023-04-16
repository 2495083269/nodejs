// 导入 Joi 来定义验证规则
const Joi = require('joi')

// 定义验证规则 alphanum()表示a-zA-Z0-9的字符串
const username = Joi.string().alphanum().min(3).max(12).required()
const password = Joi.string().pattern(/^[\S]{6,15}$/).required()

// 向外暴露一个验证规则对象
exports.reg_login_schame = {
    body: {
        username,
        password
    }
}