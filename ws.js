var ws = require("nodejs-websocket");

console.log("开始建立连接...")

var user1 = null,user2 = null , user1Ready = false , user2Ready = false;
var server = ws.createServer(function(conn){
  conn.on("text", function (str) {
    console.log("收到的信息为:"+str)
    if(str==="user1"){
      user1 = conn;
      user1Ready = true;
      //conn.sendText("success");
    }
    if(str==="user2"){
      user2 = conn;
      user2Ready = true;
      //conn.sendText("success");
    }

    if(user1Ready && user2Ready) {
      if(str==="user1" || str==="user2"){ 
        user1.sendText("success");
        user2.sendText("success");
      }
      else{
        user1.sendText(str);
        user2.sendText(str);
      }

    }
    //conn.sendText(str);
  })
  conn.on("close", function (code, reason) {
    console.log("关闭连接")
  });
  conn.on("error", function (code, reason) {
    console.log("异常关闭")
  });
}).listen(8001)
console.log("WebSocket建立完毕")
