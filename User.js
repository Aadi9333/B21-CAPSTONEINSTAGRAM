const router = require("express").Router()
const User = require("../Models/Usermodel")

// router.get("/create",(req,res)=>{ //localhost:8888/api/ig/profile/create(meaning)
//     res.send("hello aadi")
// })


router.get("/:name",async(req,res)=>{ 
    try {
        const user = await User.findOne({username:req.params.name})
        if(!user) return req.status(404).send("User Not Found")
            res.send(user)
        
    } catch (error) {
        
    }

})

router.put("/edit/:id",async(req,res)=>{
    try {
        const id= req.params.id;
        await User.findByIdAndUpdate(id,req.body)
        res.send("Profile Updated")

    } catch (error) {
        
    }
})


router.delete("/delete/:id",async(req,res)=>{
    try {
        const id= req.params.id;
        await User.findByIdAndDelete(id)
        res.send("Profile Deleted")

    } catch (error) {
        
    }
})

router.put("/follow/:id",async(req,res)=>{
    try {
        const usertobefollowed = await User.findById(req.params.id)//naidu
        const currentuser = await User.findById(req.body.userid)//nadeeswar

        if(!usertobefollowed.followers.includes
            (req.body.userid)){
        await usertobefollowed.updateOne({$push
            :{followers:req.body.userid}})
        await currentuser.updateOne({$push:{followings:req.params.id}})

        res.send("Profile Followed")
            }else{
                res.send("Profile Already Followed")
            }
    } catch (error) {
        
    }
})
router.put("/unfollow/:id",async(req,res)=>{
    try {
        const usertobeunfollowed = await User.findById(req.params.id)//naidu
        const currentuser = await User.findById(req.body.userid)//nadeeswar

        if(usertobeunfollowed.followers.includes
            (req.body.userid)){
        await usertobeunfollowed.updateOne({$pull
            :{followers:req.body.userid}})
        await currentuser.updateOne({$pull:{followings:req.params.id}})

        res.send("Profile UnFollowed")
            }else{
                res.send("Profile Already UnFollowed")
            }
    } catch (error) {
        
    }
})



module.exports = router