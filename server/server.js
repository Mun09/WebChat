const { instrument } = require('@socket.io/admin-ui')
const { Server } = require("socket.io")
const { createServer } = require("http")

const httpServer = createServer()

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:8080", "https://admin.socket.io"],
    credentials: true
  }
})
instrument(io, {
  auth: false
})
httpServer.listen(3000)

const userIo = io.of("/user")
userIo.on('connection', socket => {
  console.log("connected to user namespace with username " + socket.username)
})

userIo.use((socket, next) => {
  if(socket.handshake.auth.token) {
    socket.username = getUsernameFromToken(socket.handshake.auth.token)
    next()
  } else {
    next(new Error("Please send token"))
  }
})

function getUsernameFromToken(token) {
  return token
}


io.on('connection', socket => {
  console.log(socket.id);
  socket.on("send-message", (message, room) => {
    if (room === '') {
      socket.broadcast.emit('received-message', message)
    } else {
      socket.to(room).emit('received-message', message)
    }
  })
  socket.on("join-room", (room, cb) => {
    socket.join(room)
    cb(`Joined ${room}`)
  })
})

