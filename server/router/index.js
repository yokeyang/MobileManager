module.exports = (app) => {

    const Router = require('koa-router')
    const sql = require('../middle/sql')
    const checkcookie = require('../middle/checkcookie')
    var router = new Router()


    router.post('/postData', checkcookie, sql.checkData, async (ctx, next) => {
        ctx.body = { error: false }
    })
    router.post('/getData', checkcookie, sql.getData, async (ctx, next) => {
        ctx.body = { error: false,datas:ctx.datas }
    })
    router.post('/Login', checkcookie, sql.checkLogin, async (ctx, next) => {
        try {
            ctx.cookies.set(
                'cid',
                ctx.request.body.user,
                {
                    domain: 'localhost',  // 写cookie所在的域名
                    maxAge: 10 * 60 * 1000, // cookie有效时长
                    // path: '/',
                    httpOnly: false,  // 是否只用于http请求中获取
                    overwrite: true  // 是否允许重写
                }
            )
            ctx.cookies.set(
                'sign',
                ctx.sign,
                {
                    domain: 'localhost',  // 写cookie所在的域名
                    maxAge: 10 * 60 * 1000, // cookie有效时长
                    // path: '/',
                    httpOnly: false,  // 是否只用于http请求中获取
                    overwrite: true  // 是否允许重写
                }
            )
            return ctx.body = { error: '' }
        } catch (error) {
            return ctx.body = error.message
        }
    })
    router.post('/managers', checkcookie, sql.getManager, async (ctx, next) => {
        ctx.body = { error: false }
    })
    // require('./login')(router)
    app.use(router.routes())
        .use(router.allowedMethods())
}