import mongoose from "mongoose";
const {Schema} = mongoose;

const taskSchema = new Schema({
    id:{
        type:String,
        required:true
    },
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    status:{
        type:String,
        default:'incomplete'
    }
},{timestamps:true});

export default mongoose.model('Task',taskSchema);