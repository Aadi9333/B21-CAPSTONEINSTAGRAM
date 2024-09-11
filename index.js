const express = require("express")
const app = express()
const helmet = require("helmet")
const morgan = require("morgan")
const AuthRoute = require("./Routes/Auth") 
const userRoute = require("./Routes/User")
const mongoose = require('mongoose');
app.use(express.json())
app.use(morgan("common"))
app.use(helmet());



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://ANT:ANT@cluster0.einso.mongodb.net/',console.log("DB CONNECTED"));


}

app.use("/api/ig/auth",AuthRoute)
app.use("/api/ig/profile",userRoute)




app.listen(8888,()=>{
    console.log("server is running on port 8888")
})