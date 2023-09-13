let io;

module.exports = {
    init: (httpIn)=>{
        io = require("socket.io")(httpIn);
        return io;
    },
    getIo: ()=>{
        if(!io)
            throw new Error("Socket.io is not initialized");
        else
            return io;
    }
}