const express = require('express');
const app = express();

const http = require('http');

const port = 5000;

const server = http.createServer(app);

const path = require('path');

app.use(express.static(path.resolve(__dirname,'static')));

app.get('/', (req,res) => {
    res.send("<h1> Hello from node & express </h1>");
});

app.get('/alunos', (req,res) => {
    res.send("<h1> Buuuuhhh!!! </h1>");
});

const socketio = require("socket.io");
const io = socketio.listen(server);

const colors = ['red','blue', 'green', 'lime', 'pink', 'grey', 'fuchsia', 'indigo', 'chocolate', 'coral', 'lightblue', 'lightgreen', 'violet'];
var   coloridx = 0;

io.on("connection", (socket) => {
    var mycolor;
    var mynick;

    console.log("one more connection");
    
    socket.on("mensagem", (text) => {
        console.log(text);
        io.emit("mensagem",{"nick":mynick, "color":mycolor, "msg": text});
    });

    socket.on("nick", (nick) => {
        console.log("nick:"+nick);
        mynick = nick;
        coloridx++;
        mycolor = colors[coloridx % colors.length];
        socket.emit("nick", {"nick":nick, "color":mycolor});
        socket.broadcast.emit("new", {"nick":nick, "color":mycolor});
    });


});

server.listen(port, ()  => {
    console.log("Server running at "+ server.address().address +":"+port);
    console.log(server);
});