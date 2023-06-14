import express from 'express';
import dotenv from 'dotenv';
import {connect} from 'mongoose';
import taskRouter from './routes/taskRoute.js';
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

const env = dotenv;
env.config({path:'./config.env'});

const app =  express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use('/api',taskRouter);
app.use(notFound);
app.use(errorHandler);


connect(process.env.MONGODB_URI).then(()=>{
    const server = app.listen(process.env.PORT);
    console.log('Server connected');
}).catch(err=>console.log(err));

