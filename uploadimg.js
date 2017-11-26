var qiniu = require('qiniu');
qiniu.conf.ACCESS_KEY = '2k-naHmpjNeAmj4IPdaGYOwE5Lb0dd-lWdd38dzv';
qiniu.conf.SECRET_KEY = 'adVLZeHw4_B6Moi8Xje9XshEPMd1kJoVDSDDViWS';
//要上传的空间
var bucket = 'phone';

//上传到七牛后保存的文件名
//构建上传策略函数
function uptoken(bucket, key) {
  var options = {
    scope: bucket + ":" + key
  }
  var putPolicy = new qiniu.rs.PutPolicy(options);
  return putPolicy.uploadToken();
}
module.exports = uploadFile = (localFile,key) =>{
  var promise = new Promise(function(resolve, reject){
    var token = uptoken(bucket, key);
    var extra = new qiniu.form_up.PutExtra();
    var config = new qiniu.conf.Config();
    var formUploader = new qiniu.form_up.FormUploader(config);
    formUploader.putFile(token, key, localFile, extra, function(err, ret) {
      if(!err) {
        console.log('success')
        resolve(true)
      } else {
        // 上传失败， 处理返回代码
        console.log('error')
        console.log(err);
      }
    });
  })
  return promise
}
