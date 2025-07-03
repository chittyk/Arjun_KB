const express = require("express")
const connectDB = require("./config/db")
require('dotenv').config()
const app = express()


app.use(express.json())

//const db
connectDB()

//rotutes
app.use('/Arjun_KB',user)
app.use('/AdiminAccess',adimin)

//create the sever
const PORT =process.env.PORT
console.log(PORT)
app.listen(PORT,()=>{
    console.log(`server is running on https://localhost:${PORT}`)
})