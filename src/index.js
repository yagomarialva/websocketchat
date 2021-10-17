import express from 'express';
import http from 'http';
import socketio from 'socket.io';

const app = express();
const server = http.Server(app);

app.use(express.static(__dirname + '/public'));

const io = socketio(server);
 
 
//configura as rotas
io.on('connect', (socket) => {

    io.to(socket.id).emit(
        {
            status: true,
            mesage: "Connection started"
        }
    );

    socket.on('test', (res) => {
        console.log('mesage received',res);

        // io.to(socket.id).emit(res);
        socket.broadcast.emit('test', res);
    })
})

app.get('/', (req,res) => {
    res.render('index.html');
});

app.get('/test', (req,res) => {
    res.json({status : true});
});

//inicia o server, porta 3333, mensagem no console log
server.listen(3333, () => {
    console.log("Server inicialized", 3333)
})

