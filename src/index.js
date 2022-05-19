const express =require("express")
// const { path } = require("express/lib/application")
const path = require("path")
const router = require("./Router/webrtc.router")
const http = require('http')
const { Server } = require("socket.io");
const app= express()

const httpServer= http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
})


const port = process.env.PORT||3000

// middleware
app.use(express.static(path.join(__dirname,"/public")))
app.set('views', path.join(__dirname, '/public'));
app.engine('html', require('ejs').renderFile);  
app.set('view engine', 'html');
app.use(express.json())
app.use("/",router)




// socket connection



io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

}
)






app.listen(port,()=>{
    console.log(`${port} is listining`)
})

io.listen(8000)