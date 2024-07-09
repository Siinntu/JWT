const express = require('express') ;
const databaseconnect = require('./config/databaseconfig');
const app =express();
const authRouter=require('./router/authrout');
app.use(express.json());

databaseconnect();
app.use('/api/auth',authRouter);

app.use('/',(req,res)=>{
    res.status(200).json({data: 'JWTauth server updated'});
});

module.exports=app;
