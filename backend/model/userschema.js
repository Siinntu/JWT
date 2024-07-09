const mongoose=require('mongoose');
const {schema}=mongoose;
const userschema=new schema({
    name:{
        type:String,
        required:[true,'user name is required'],
        minlength:[5,'name must be at least 5 char'],
        maxlength:[50,'name must be less than 50 char'],
        trim:true

    },
    email:{
        type:String,
        required:[true,'user email is required'],
        unique:true,
        lowercase:true,
        unique:[true, 'already registered']
    },
    password:{
        type:String,
        select:false
    },
    forgotpasswordToken:{
        type:String,
    },
    forpasswordExpiryDate:{
        type:Date,
    },


},{
    timestamp:true
});
const userModel=mongoose.model('user',userschema);
module.exports=userModel;