const mysql = require('mysql')

// 创建与数据库的连接

const db = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'admin123',
    database: 'my_db'
})

// 导出数据库模块
module.exports = db