import { Schema,model,Types } from "mongoose";
import {courseSchema} from "./course.js"


const cstudentSchema=Schema({
    date:{type:Date,default:new Date()},
    endDate:{type:Date,default:()=>{
        let d=new Date()
        return d.setDate(d.getDate()+7)
    }},
    userId:{
        type:Types.ObjectId,
        ref:"users"
    },
    courses:[courseSchema],
    isEnd:{type:Boolean,default:false}
})
export const cstudentModel=model("cstudent",cstudentSchema);