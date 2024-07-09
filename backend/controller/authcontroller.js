const userModel=require("../model/userschema");
const emailvalidator=require("email-validator");
const signup = async(req,res,next) => {
     const {name,email,password,confirmpassword}=req.body;
     console.log(name,email,password,confirmpassword);

     if(!name || !email || !password || !confirmpassword){
        return res.status(400).json({
            success:false,
            message:"every field is required"
        })
     }
     const validEmail=emailvalidator.validate(email);
     if (!validEmail) {
        return res.status(400).json({
            success:false,
            message:"please provide a valid email id"
        })
        
     }
     if (password !=confirmpassword) {
        return res.status(400).json({
            success:false,
            message:"password and confirmpassword doesnt match"
        })
        
     }
    
     try{
        const userInfo=userModel(req.body);
        const result= await userInfo.save();

        return res.status(200).json({
            succuess:true,
            data:result
         });

     }catch(e){
        if(e.code ===11000){
            return res.status(400).json({
                success:false,
                message:'Account already exists with provided email id'
            })
        }
        return res.status(400).json({
            success:false,
            message:e.message
        })

     }

}
const signin=async(req,res)=>{
    const {email,password}=req.body;
    if (!email || !password) {
        return res.status(400).json({
            success:false,
            message:"every field is mendatory"
        })
        
    }

    const user=await userModel
    .findone({
        email
    })
    .select('+password');

    if (!user || user.password !=== password){
        return res.status(400).json({
            success:false,
            message:'INVALID CRENDENTIALS'
        })

    }


}

const getuser =async(req,res,next)=>{
     const userId=req.user.id;
     try {
        const user=await userModel.findById(userId);
        return res.status(200).json({
            success:true,
            data:user
        });
     } catch (error) {
        return res.status(400).json({
            success:false,
            message:e.message
        })
     }
}
module.exports = {
    signup,
    signin
}