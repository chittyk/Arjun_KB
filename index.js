const express = require("express")
const connectDB = require("./config/db")
require('dotenv').config()
const app = express()
const adminRoute = require('./routes/adimin')
const cors = require('cors')

app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173", // React dev server
  credentials: true,
}));

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