const Koa = require('koa')
    , views = require('koa-views')
    , static = require('koa-static')
    , app = new Koa()
    , convert = require('koa-convert')
    , serve = require('koa-static2')
    , bodyparser = require('koa-bodyparser')

    
    
    
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(views(__dirname + '/view',))
app.use(convert(serve("../client/build/static", __dirname + '/public')))

const server = require('http').Server(app.callback())
    , io = require('socket.io')(server)
server.listen(3002)

require('./router/index')(app)


app.listen(3001)
console.log('starting at port 3001')

io.on('connection', function (socket) {
    socket.on('print', function (data) {
        console.log(data)
        setTimeout(() => { socket.emit('printed') }, 2000)
    })
})