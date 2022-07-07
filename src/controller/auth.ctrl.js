const auth = require("../model/auth.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
exports.authRegistration = async(req,res)=>{
    try {
        const password = req.body.password
        const confirm_password = req.body.confirm_password
        if(password===confirm_password){
            const user = new auth({
                username:req.body.username,
                email:req.body.email,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
            });
                let userData = await user.save()
                    res.status(200).json({
                        message:"user successfully registred..!!!",
                        status:200,
                        data:userData
                    })
                    const token =  user.generateauthtoken()    
                    res.cookie("jwt", token, {
                        expires: new Date(Date.now() + 300000),
                        httpOnly: true
                    })
        }
        else{
            res.json({
                message:"password does not matched"
            })
        }
         
    } catch (error) {
        console.log("error",error);
        res.status(500).json({
            message:"something went wrong..!!!",
            status:500
        })
    }
}

exports.authLogin = async(req,res)=>{
    try {
        const username = req.body.username;
        const password = req.body.password;

        console.log("pass",password);
        const userEmail = await auth.findOne({username:username})
        console.log("data",userEmail);
        if(userEmail){
            const token = await userEmail.generateauthtoken()
                res.cookie("jwt",token,{
                    expires: new Date(Date.now() + 300000),
                    httpOnly: true
                })
            if (bcrypt.compare(password, userEmail.password)) {
                res.status(200).json({
                    message:"login successfully",
                    status:200,
                    token:token
                })
            }
            else {
                res.send("invalid details");
            }
        }
        else{
            res.status(404).json({
                message:"user not found",
                status:404

            })
        }
        
    } catch (error) {
        console.log("error",error);
        res.status(500).json({
            message:"something went wrong",
            status:500
        })
    }
}

exports.authLogout = async(req,res)=>{
    try {
        req.user.tokens = []
        res.clearCookie("jwt");
        await req.user.save();
        res.status(201).json({
            message: "logout Successfully...!!!",
            status: 201
        })
    } catch (error) {
        
        res.status(401).json({
            message: "please try again....!!!",
            status: 401
        })
    }
}

exports.forgotPassword = async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const confirm_password = req.body.confirm_password
        const userEmail = await auth.findOne({email:email})
        if(userEmail){
            if(password===confirm_password){
                
                const updateData = await auth.findByIdAndUpdate({_id:req.params.id},{
                    $set:{
                        password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null) 
                    }
                },{
                    new: true,
                    useFindAndModify: false
                }).then(()=>{
                    res.status(200).json({
                        message: "user's record successfully updated....!!!!",
                        status: 200
                    })
                }).catch((error)=>{
                    res.status(500).json({
                        message:"something went wrong"
                    })
                })
               
            }
            else{
                res.status(401).json({
                    message:"password does not matched",
                    status:401
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"something went wrong"
        })
    }
}