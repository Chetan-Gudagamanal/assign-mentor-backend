import mongoose from "mongoose";

const mentorSchema= new mongoose.Schema(
    {
        mentorName:{
            type:String,
            required:true
        },
        mentorEmail:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now()
        },
        assignedStudentsIds:{

        }
    }
)

export const Mentors=mongoose.model('Mentor',mentorSchema)