const router = require("express").Router()
const User = require("../Models/Usermodel")
const bcrypt= require("bcrypt")


router.post("/register",async(req,res)=>{//localhost:8888/api/ig/auth/register
    try{
      //req.body.password=123456
        const salt= await bcrypt.genSalt(10)
        const bcryptedpassword= await bcrypt.hash(req.body.password,salt)

    await new User({
        username:req.body.username,
        email:req.body.email,
        password:bcryptedpassword

    }).save()

    res.send("Account created")

}catch(err){
    res.status(404).send(err)
}
})

router.post("/login",async(req,res)=>{
    try {
        const user= await User.findOne({email:req.body.email})
        if(!user)return req.status(404).send("User Not Found")

        const validpassword = await bcrypt.compare(req.body.password,user.password)
        if(!validpassword) return res.status(404).send("Invalid Password")
            res.send("Logged In")

    } catch (error) {
      res.status(404).send(err)
    }
    
})

module.exports=router