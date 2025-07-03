const express = require("express")
const connectDB = require("./config/db")
require('dotenv').config()
const app = express()
const adminRoute = require('./routes/adimin')


app.use(express.json())

//const db
connectDB()

//rotutes
// app.use('/Arjun_KB',user)
app.use('/AdiminAccess', adminRoute)

//create the sever
const PORT =process.env.PORT
console.log(PORT)
app.listen(PORT,()=>{
    console.log(`admin server is running on https://localhost:${PORT}/AdiminAccess`)
})