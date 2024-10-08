const mongoose=require("mongoose")



const UserSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
    },
    bio:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
    },
    followings:{
        type:Array
    }
    }

)


module.exports=mongoose.model("User",UserSchema)