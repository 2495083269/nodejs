// 导入数据库操作模块
const db = require('../db')
// 导入bcryptjs包对密码进行加密
const bcrypt = require('bcryptjs')
// 导入生成token的模块
const jwt = require('jsonwebtoken')
// 导入加密的信息
const config = require('../config')
// 注册新用户的处理函数
exports.reguser = (req, res) => {
    const userInfo = req.body
    if (!userInfo.password || !userInfo.username) {
        // return res.send({ status: 1, message: '用户名或密码不能为空!' })
        return res.cc('用户名或密码不能为空!')
    }

    // 定义sql语句，查询用户名是否被占用
    const sqlStr = 'select * from user where username=?'
    db.query(sqlStr, userInfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length == 1) {
            // return res.send({status:1,message: '用户名被占用，请更换其他用户名!'})
            return res.cc('用户名被占用，请更换其他用户名!')
        }
        // 调用方法对密码进行加密
        userInfo.password = bcrypt.hashSync(userInfo.password,10)
        // 定义插入新用户的sql
        const sqlInsert = 'insert into user set ?'
        db.query(sqlInsert,{username:userInfo.username,password:userInfo.password},(err,result) => {
            if (err) return res.cc(err)
            // 判断影响行数是否为1
            if (result.affectedRows !== 1){
                // return res.send({status:1,message: '注册用户失败，请稍后再试！'}) 
                return res.cc('注册用户失败，请稍后再试！')
            }
            // res.send({status:0,message: '注册用户成功'})
            res.cc('注册用户成功!',0)
        })
    })
    // res.send('reguser OK')
}


exports.login = (req, res) => {
    // 接收表单数据
    const userInfo = req.body
    // 剔除用户的隐私信息
    const user = {...userInfo,password:'',user_pic:''}
    // 定义sql语句
    const sqlStr = 'select * from user where username=?'
    db.query(sqlStr,userInfo.username,(err,results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) {
            return res.cc('登录失败！')
        }
        // 判断密码是否一致
        const comperResult = bcrypt.compareSync(userInfo.password,results[0].password)
        if (!comperResult) return res.cc("密码错误，登录失败！")
        // res.send('login OK')
        
        // 在服务器端生成token
        const token = jwt.sign(user,config.jwtSecretKey,{expiresIn: config.tokenTime})
        res.send({
            status: 0,
            message: '登录成功！',
            token:  token
        })
    })
}