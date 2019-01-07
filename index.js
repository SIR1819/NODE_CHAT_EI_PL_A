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


io.on("connection", (socket) => {
    console.log("one more connection");
    socket.on("mensagem", (dados) => {
        console.log(dados);
        io.emit("mensagem",dados);
    });
});

server.listen(port, ()  => {
    console.log("Server running at "+ server.address().address +":"+port);
    console.log(server);
});