import expressAsyncHandler from "express-async-handler";
import { v4 as uuidv4 } from 'uuid';
import Task from '../models/task.js';

export const createTask = expressAsyncHandler(async(req,res,next)=>{
    const {title,description} = req.body;
    if(!title || !description){
        res.status(400);
            throw new Error('Filed title and description are mandatory');
    }else{
        try{
            await Task.create({
                id:uuidv4(),
                title:title,
                description:description
            });
           return res.status(200).json({'message':'task created successfully','status':true});
        }catch(err){
            res.status(401);
            throw new Error(err);
        };
    }

});

export const getTask = expressAsyncHandler(async(req,res,next)=>{
    const id = req.params.id;
    if(!id){
        res.status(400);
            throw new Error('Please provide task id');
    }else{
        try{
            const task = await Task.findOne({'id':id});
            if(!task){
                res.status(401);
                throw new Error(err);
            }else{
                return res.status(200).json({'message':'task found','status':true,"task":task});
            }
           
        }catch(err){
            res.status(401);
            throw new Error(err);
        };
    }

});


export const getAllTask = expressAsyncHandler(async(req,res,next)=>{
    try{
        const tasks = await Task.find();
        return res.status(200).json({'message':'Successfully','status':true,"tasks":tasks});
    }catch(err){
        res.status(400);
        throw new Error(err);
    };

});

export const editTask = expressAsyncHandler(async(req,res,next)=>{
    const id = req.params.id;
    const {title,description,status} = req.body;
    if(!id){
        res.status(400);
            throw new Error('Please provide task id');
    }else{
        try{
            const result = await Task.findOne({'id':id});
            if(result){
                if(title!==' '){
                    result.title = title;
                }
                if(description!==' '){
                    result.description = description;
                }
                if(status!==' '){
                    result.status = status;
                }
                await result.save();
                return res.status(200).json({'message':'task updated successfully','status':true,"task":result});
            }else{
                res.status(400);
                throw new Error('Provided task id is not valid');
            }
        }catch(err){
            res.status(401);
            throw new Error(err);
        };
    }

});

export const deleteTask = expressAsyncHandler(async(req,res,next)=>{
    const id = req.params.id;
    if(!id){
        res.status(400);
            throw new Error('Please provide task id');
    }else{
        try{
            const result = await Task.deleteOne({'id':id});
            if(result){
                return res.status(200).json({'message':'task deleted successfully','status':true});
            }else{
                res.status(400);
                throw new Error('Provided task id is not valid');
            }
        }catch(err){
            res.status(401);
            throw new Error(err);
        };
    }

});