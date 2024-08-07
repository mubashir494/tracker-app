import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import express from 'express' 
import user from './routes/user.js'
import journey from './routes/journey.js'
import trip from './routes/trip.js'
import status from './routes/status.js'
import dotenv from 'dotenv'
import http from 'http'
import socketFunc from './controller/socket.js'
import {fileURLToPath} from 'url'
import path from 'path'
import {Server} from 'socket.io'



const app = express()
const PORT = process.env.PORT || 4000;
const CONNECTION_URL =  process.env.MONGODB_URI || 'mongodb+srv://server:MbIWrHCmhUYXO78b@cluster0.gdrhq.mongodb.net/thirdDatabase?retryWrites=true&w=majority'

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config()
app.use(cors());


app.use('/user',user)
app.use('/journey',journey)
app.use('/trip',trip)
app.use('/status',status)
const server = http.createServer(app)

const io = new Server(server,{
    cors : {
        origin : '*',
        methods : ["GET","POST"]
    }
})
// socketFunc(io)

if(process.env.NODE_ENV == "production"){
    const __filename = fileURLToPath(import.meta.url);
    app.use(express.static('client/build'))
    const __dirname = path.dirname(__filename);
    app.get("*",(req,res) =>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
mongoose.connect(CONNECTION_URL,{useNewUrlParser : true, useUnifiedTopology : true}).then(
    () => {
        server.listen(PORT ,() => {console.log("Connected to PORT "+PORT)})
    }
    ).catch((error) =>{
        console.log(error.message)
    })
