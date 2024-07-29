import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength: 3, 
    },
    email:{
        type: String, 
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true,
      
    },

    isAdmin:{
        type:Boolean,
        default:false,
    },
},
{
    timestamps:true,
}
);

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})



const User = mongoose.model("User", userSchema);
export  default User;