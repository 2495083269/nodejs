const express = require('express')
// 导入解决跨域的文件
const cors = require('cors')
// 导入 Joi 来定义验证规则
const Joi = require('joi')
// 配置解析token的中间件
const config = require('./config')
const { expressjwt: jwt } = require('express-jwt')


const app = express()
// 配置跨域
app.use(cors())
// 配置解析文件的中间件
app.use(express.urlencoded({extended: false}))


// 封装一个全局错误中间件
app.use((req,res,next) => {
    // status失败值为1
    res.cc = function(err,status = 1){
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

// 使用unless指定哪些接口不需要进行token验证
app.use(jwt({secret: config.jwtSecretKey,
    algorithms: ["HS256"],
}).unless({path: [/^\/api\//]
}))

// 导入并使用路由模块
const userRouter = require('./router/user')
app.use('/api',userRouter)
// 导入userinfo路由模块
const userInfoRouter = require('./router/userInfo')
app.use('/my',userInfoRouter)

// 4.1 错误级别中间件
app.use(function (err, req, res, next) {
    // 4.1 Joi 参数校验失败
    if (err instanceof Joi.ValidationError) {
      return res.cc(err)
    }
    if (err.name === "UnauthorizedError") return res.cc('身份认证失败！')
    // 4.2 未知错误
   res.cc(err)
  })


app.listen(3007,() => {
    console.log('api server http://127.0.0.1:3007')
})