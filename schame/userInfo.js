// 导入 Joi 来定义验证规则
const Joi = require('joi')

// 定义验证规则 alphanum()表示a-zA-Z0-9的字符串
const username = Joi.string().alphanum().min(3).max(12)
const nickname = Joi.string().required()
const email = Joi.string().email()

// 重置密码的验证规则
const password = Joi.string().pattern(/^[\S]{6,15}$/).required()

// 上传头像的验证规则,指定图片的格式
const avatar = Joi.string().dataUri().required()

// 向外暴露一个验证规则对象
exports.update_userInfo_schame = {
    body: {
        username,
        nickname,
        email
    }
}

exports.update_password_schame = {
    body: {
        oldPwd: password,
        // 新密码不得与旧密码重复 concat用于合并两条校验规则
        newPwd: Joi.not(Joi.ref('oldPwd')).concat(password)
    }
}

exports.update_avatar_schame = {
    body: {
        avatar
    }
}