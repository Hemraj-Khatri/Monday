import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import createToken from '../utils/token.utils.js';
import asynHandler from '../middleware/asynchandler.middleware.js';
 import ApiError from '../utils/apiError.js';
 
 //@des: register user 
 //@route: /api/v1/users/signup
 //@access: public
 const signup = asynHandler(async(req, res, next)=>{

    let{name, email, password, isAdmin} = req.body;
    let userexits = await User.findOne({email:email});
    if(userexits){
        throw new ApiError(400,`User with email ${email} already exists!` )
        }
    
        let newuser = await User.create({
        name, 
        email, 
        password,
        isAdmin, 
    }
    );
   
    createToken(res, newuser._id);
    res.send({
        message:"User registered sucessfully",
        user:{
            name:newuser.name,
            email:newuser.email, 
            isAdmin: newuser.isAdmin,

        }
    });
});

 //@des: login user 
 //@route: /api/v1/users/login
 //@access: public
const login = asynHandler(async (req, res, next) =>{
   
        const {email, password} =req.body;
        //check if user exists
        const user = await User.findOne({email});
        if(!user){
            throw new ApiError(400, "user with this email does not exist")
            }
        // compare password
        const isMatch  = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new ApiError(400, "Invalid Password!")
           
        }
       createToken(res, user._id);
        res.send({message: "login successfully"});

    }); 


     //@des: logout user 
 //@route: /api/v1/users/logout
 //@access: private
const logout = asynHandler((req, res)=>{
    res.clearCookie("jwt");
    res.send({message: "logout Successfully"})
}
);
 //@des: Get All  users 
 //@route: /api/v1/users
 //@access: private/admin
const getUsers = asynHandler(async(req, res) =>{
    let users = await User.find({}).select('-password');
    res.send(users)
});

 //@des: fetch logined  user  
 //@route: /api/v1/users/profile(get request)
 //@access: private
const getUserProfile = asynHandler(async(req, res)=>{
    if(req.user){
        res.send(req.user)
    }
});
 //@des: update  user by user own
 //@route: /api/v1/profile (put request)
 //@access: private
const updateUserProfile = asynHandler(async(req, res)=>{
    if(req.user){
        let user = await User.findById(req.user._id);
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password;
        }
        let updateUser = await user.save();
        res.send({message:"user profile updated", user: updateUser})
    }
});

 //@des: update  user by admin 
 //@route: /api/v1/update/:_id (put request)
 //@access: private/admin
const updateUser = asynHandler(async(req, res)=>{
    let id = req.params._id;
    let user = await User.findById(id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);
        let updateUser = await user.save();
        res.send({Message:"User Updated", user: updateUser});
    }else{
        throw new ApiError(404, "User not found")
    }
});

 //@des: delete   user 
 //@route: /api/v1/delete/:_id (delete request)
 //@access: private/admin

const deleteUser = asynHandler(async(req, res)=>{
    let id = req.params._id;
    let user = await User.findById(id);
    if(user){
        if(user.isAdmin){
            throw new ApiError(400, "Connot remove admin user");
        }
        await User.findByIdAndDelete(id);
        res.send("User removed");
    }
});


export {signup, login, logout, getUsers, getUserProfile, updateUserProfile, updateUser, deleteUser}
