import mongoose from "mongoose";

const studentSchema=new mongoose.Schema(
    {
        studentName:{
            type:String,
            required:true
        },
        studentEmail:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now()
        },
        
        assignedMentor:{
        
        }
    }
)
export const Students=mongoose.model("Student",studentSchema)