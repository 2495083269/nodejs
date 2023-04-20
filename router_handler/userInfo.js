// 导入数据库操作模块
const db = require('../db')
// 导入bcryptjs包对密码进行加密
const bcrypt = require('bcryptjs')


exports.getUserInfo = (req,res) => {
    // 根据用户id查询用户信息
    // 为防止密码泄露，查询时去除password字段
    const sql = `select id, username, nickname, email, pic_img  from user where username=?`
    db.query(sql,req.auth.username,(err,result) => {
        if(err) return res.cc(err)
        if (result.length !== 1) return res.cc('获取用户信息失败！')
        res.send({
            status: 0,
            message: '获取用户信息成功',
            result: result[0]
        })
    })
}

exports.updateUserInfo = (req,res) => {
    // 通过id修改用户信息
    const sql = `update user set ? where id=?`
    db.query(sql,[req.body,req.auth.id],(err,result)=> {
        if (err) return res.cc(err)
        if (result.affectedRows !==1) return res.cc('修改用户信息失败！')
        res.cc('修改用户信息成功！',0)
    })
}

exports.updatePassword = (req,res) => {
    const sql = `select * from user where id=? `
    db.query(sql,req.auth.id,(err,result) => {
        if (err) return res.cc(err)
        if (result.length !==1) return res.cc('查找用户信息失败！')
        // 判断提交的旧密码是否正确
        const comperResult = bcrypt.compareSync(req.body.oldPwd,result[0].password)
        if (!comperResult) return res.cc("旧密码输入错误！")
        // 密码加密存入数据库
        const newPwd = bcrypt.hashSync(req.body.newPwd,10)
        // 修改密码
        const sqlUrl = `update user set password=? where id=?`
        db.query(sqlUrl,[newPwd,req.auth.id],(error,results)=> {
            if (error) return res.cc(error)
            if (results.affectedRows !==1) return res.cc('修改密码失败！')
            res.cc('修改密码成功！',0)
        })
    })
}

exports.updateAvatar = (req,res) => {
    const sql = `update user set pic_img=? where id=?`
    db.query(sql,[req.body.avatar,req.auth.id],(err,result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !==1) return res.cc('更新头像失败！')
        res.cc('更新头像成功！',0)
    })
}