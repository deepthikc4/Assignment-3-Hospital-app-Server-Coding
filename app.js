const express=require('express');
const morgan=require('morgan');
require('dotenv').config();
const routerfile=require('./Routes/BasicRoute');

// 2-initialization
const app=new express();
app.use(morgan('dev'));

const PORT= process.env.PORT;

app.use('/api',routerfile);
app.listen(PORT,(req,res)=>{

    console.log(`Server is up and running on ${PORT}`)
})

