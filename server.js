var express = require('express')
var mysql = require('mysql')
var jwt = require('jsonwebtoken')
var Base64 = require('js-base64').Base64
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var bodyParser = require('body-parser')
var multipart = require('connect-multiparty')
var multer = require('multer')
var multipartMiddleware = multipart()
var uploadFile = require('./uploadimg')
server.listen(3002)
var dboption = {
  host: "localhost",
  user: "root",
  password: "yang218906",
  database:"Mobile"
}
var insert = (res) =>{
  var con = mysql.createConnection(dboption)
  con.connect(function(err) {
    if (err) throw err
    console.log("Connected!")
    var sql = "INSERT INTO userInfo (name,tel,address,kind,imgUrl) VALUES (?,?,?,?,?)"
    con.query(sql,[res.name,res.tel,res.address,res.kind,res.imgUrl[0]],function (err, result) {
      if (err) throw err
      console.log("insert!")
    })
  })
}
var select = (sql) =>{
  var promise = new Promise(function(resolve, reject){
    var con = mysql.createConnection(dboption)
    con.connect()
    con.query(sql, function (err, result, fields) {
      if (err) throw err
      resolve(result)
    })
    con.end()
  })
  return promise
}
var user,token,token_password
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/postimg',multipartMiddleware,(req,res,next)=>{
  var imgData = req.body.file;
	//过滤data:URL
	var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  uploadFile(base64Data,req.body.name).then(function(value){
    console.log(value)
    res.json({
      path:[`http://owmdzsjg2.bkt.clouddn.com/${req.body.name}`]
    })
  },function(value){
    return false
  })
})
app.post('/postText',(req,res)=>{
  insert(req.body)
  res.json({post:true})
})
app.post('/getdata',(req,res) =>{
  let sql = 'SELECT * FROM userinfo'
  switch (req.body.status) {
    case 'all':
      sql = 'SELECT * FROM userinfo'  
      break;
    case 'waiting':
      sql = `SELECT * FROM userinfo where finish = 0`
      break;
    case 'finish':
      sql = `SELECT * FROM userinfo where finish = 1`
      break;
    default:
      break;
  }
  select(sql).then(function (value) {
    res.json({ result: value })
  }, function (value) {
    return value
  })  
})

app.post('/user', (req,res)=>{
  var con = mysql.createConnection(dboption)
  con.connect()
  con.query(`select * from manager where user = '${req.body.user}'`,(err, result, fields)=>{
    if(result.length){
      if(Base64.decode(req.body.password) == result[0].password){
        res.json({login:true,user:result[0].user,psd:result[0].password,Smanager:result[0].Smanager})
        return true
      }
    }
    res.json({login:false})
  })
})

app.get('/managers',(req,res)=>{
  var con = mysql.createConnection(dboption)
  con.connect()
  con.query(`select * from manager`,(err, result, fields)=>{
    console.log(result)
    res.json({data:result})
  })
})
app.listen(3001,()=>{
  console.log('listening on 3001')
})
io.on('connection', function (socket) {
  socket.on('print', function (data) {
    console.log(data)
    setTimeout(()=>{socket.emit('printed')},2000)
  })
})
