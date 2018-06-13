var express = require("express");
var app = require("express")();
var http = require('http').Server(app);
var io = require("socket.io")(http);

app.get('/',(req,res)=>{
    res.sendFile("C:/NodePubSub/index.html",{"Content-Type": "text/html"});
});

http.listen(3030,()=>{
    console.log("Host is active on 3030");
});

app.use(express.static(__dirname));

io.on('connection',(socket)=>
{
    socket.join('hello');
    console.log(socket.rooms);
    console.log('a user is connected');
    socket.on('chat message',(mesg)=>
    {
        console.log(socket.rooms);
        io.emit("chat message",mesg);
        socket.broadcast.emit(mesg);
    });
    socket.on('button Event',(mesg)=>{
        socket.to('hello').emit('chat message','this is a system generated message');
    });
    io.to('hello').emit('chat message','Welcome');
})