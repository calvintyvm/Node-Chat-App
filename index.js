let express = require('express');
let socket = require('socket.io');

//APP setup
//created express application, created server
let app = express();
let server = app.listen(4000, ()=>{
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));

//Socket setup
//set it equal to socket, invoking it and passing server as a arguement
let io = socket(server);
//waits for "connection", once connection is made, callback function is called
//passes through the socket which is between the client and the server
//new id is made everytime it is refreshed
//server recieves the data form client, looking for "chat",
//fires the call back function, which is getting all sockets and emitting down all sockets
//the chat message and send back the data back to all sockets.
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', data => {
        // console.log(data);
        io.sockets.emit('chat', data);
    });
    socket.on('typing',data => {
        socket.broadcast.emit('typing',data);
    });

});

