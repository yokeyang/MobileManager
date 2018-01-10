'use strict'
const mysql = require('mysql')
const fs = require('fs')
const md5 = require('./md5')
// 创建数据池
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'yang218906',
    database: 'Mobile'
})
function con(sql) {
    return new Promise(resolve => {
        // pool.getConnection((err, connection) => {
        pool.query(sql, (error, results, fields) => {
            resolve(results)
            if (error) throw error;
        })
        // }) 
    })
}
exports.con = con

exports.checkLogin = async (ctx, next) => {
    try {
        let user = ctx.request.body.user,
            psd = ctx.request.body.psd
        var cpsd = ''
        let result = await con(`SELECT * FROM manager where user = '${user}'`)
        cpsd = result[0].password
        if (cpsd === psd) {
            ctx.sign = md5.md5encrypt(user, psd)
            await next()
        } else {
            return ctx.body = { error: 'password error' }
        }        
    } catch (error) {
        return ctx.body = error.message
    }
}

exports.getManager = async (ctx, next) => {
    try {
        if (ctx.user === '' || ctx.user === undefined) {
            return ctx.body = { error: 'not login' }
        }
        let id = ctx.request.body.id
        let result = await con(`select * from manager`)
        ctx.managers = results
        await next()
    } catch (error) {
        return ctx.body = { error: error.message }
    }
}

exports.checkData = async (ctx, next) => {
    try {
        if (ctx.user === '' || ctx.user === undefined) {
            return ctx.body = { error: 'not login' }
        }
        await con(`INSERT INTO userInfo (name,tel,address,kind,imgUrl) VALUES (${ctx.request.body.name},${ctx.request.body.tel},${ctx.request.body.address},${ctx.request.body.kind},${ctx.request.body.imgUrl[0]})`)
        await next()
    } catch (error) {
        return ctx.body = error.message
    }
}
exports.getData = async (ctx, next) => {
    try {
        let sql = 'SELECT * FROM userinfo'
        console.log(ctx.request.body.status)
        switch (ctx.request.body.status) {
            case 'all':
                break;
            case 'waiting':
                sql = 'SELECT * FROM userinfo where finish = 0'
                break;
            case 'finish':
                sql = 'SELECT * FROM userinfo where finish = 1'            
                break;
            default:
                break;
        }
        ctx.datas = await con(sql)
        await next()
    } catch (error) {
        return ctx.body = error.message
    }
}

exports.changePsd = async (ctx, next) => {
    try {
        let psd1 = ctx.request.body.psd1
        let psd2 = ctx.request.body.psd2
        if (psd1 !== psd2) {
            return ctx.body({ error: 'Inconsistencies password and confirm password!' })
        }
        await con(`update manager set password='${psd1}' where user='${ctx.request.body.user}'`)
        await next()
    } catch (error) {
        return ctx.body = error.message
    }
}