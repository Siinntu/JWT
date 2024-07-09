const express=require('express');
const { signup,signin,getuser } = require('../controller/authcontroller');
const authRouter=express.Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.post('/user', getuser);

module.exports=authRouter;