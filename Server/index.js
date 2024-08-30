import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import route from './Routes.js/Route.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json({limit:'30mb',extended:true}))
app.use(morgan('dev'))
app.use(express.urlencoded({limit:'30mb',extended:true}))
app.use(cors())
app.use(express.static('public'))
app.use(cookieParser())

const port = process.env.PORT;
const databaseUrl = process.env.DATABASE_URL;
console.log(port,'===================================ppp');


app.use('/',route)

mongoose.connect(databaseUrl,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
 
app.listen(port,()=>{
  console.log(`express app listening on port${port}` );
})
}).catch((error)=>{console.log(`${error} did not connect`);})

