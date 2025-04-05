import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    temperature:{
        type:Number,
        required:true
    },
    humidity:{
        type:Number,
        required:true
    },
});

export default mongoose.model('Product',productSchema);