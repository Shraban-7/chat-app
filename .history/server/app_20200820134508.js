const io = require('socket.io')(8000)

const users ={};

io.on('connection',socket=>{
    socket.on('new-user-joined', name=>{
        users[socket.id] = name;
        socket.broadcast
    })
})