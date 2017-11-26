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
  password: "218906",
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
var select = () =>{
  var promise = new Promise(function(resolve, reject){
    var con = mysql.createConnection(dboption)
    con.connect()
    con.query("SELECT * FROM userInfo", function (err, result, fields) {
      if (err) throw err
      resolve(result)
    })
    con.end()
  })
  return promise
}
var token,token_password
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/postimg',multipartMiddleware,(req,res,next)=>{
  uploadFile(req.files.file.path,req.files.file.originalFilename).then(function(value){
    res.json({
      path:[`http://owmdzsjg2.bkt.clouddn.com/${req.files.file.originalFilename}`]
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
  select().then(function (value) {
    res.json({result:value})
  }, function (value) {
    return value
  })
})
app.post('/user', (req,res)=>{
  var con = mysql.createConnection(dboption)
  con.connect()
  con.query(`select * from manager where user = '${req.body.user}'`,(err, result, fields)=>{
    if(result.length){
      if(Base64.decode(req.body.password) == Base64.decode(result[0].password)){
        token = jwt.sign({msg:req.body.user},req.body.password,{expiresIn: 5*60})
        token_password = req.body.password
        res.json({login:true})
        return true
      }
    }
    res.json({login:false})
  })
})
app.get('/isLogin',(req,res) => {
  jwt.verify(token, token_password,(err,decoded)=>{
    if(err){
      res.json({error:true})
    }else{
      res.json({isLogin:true,user:decoded.msg})
    }
    return true
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
