import express from "express"
import mongoose from "mongoose"
import {Mentors} from "./models/mentorSchema.js"
import {Students} from "./models/studentSchema.js"
import handleAssignStudents from "./controllers/AssignStudents.js"
import handleAssignMentor from "./controllers/AssignMentor.js"
import handleCreateMentor from "./controllers/createMentor.js"
import handleCreateStudent from "./controllers/createStudent.js"
import handleStudentsAssignedToMentor from "./controllers/StudentsHandeledByMentor.js"
import cors from "cors"


const url=process.env.MONGODB_URI || "mongodb://localhost/studentManagement"
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const app=express()
app.use(express.json())
app.use(cors())

const port=process.env.PORT || 3001;

app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.post("/addMentor",(req,res)=>{handleCreateMentor(req,res,Mentors,Students)})

app.post("/addStudent",(req,res)=>{handleCreateStudent(req,res,Mentors,Students)})

//Mentor id should be passed as params and all students ids should be passed as array in req.body(to assign multiple students to the menter)
app.patch("/assignStudents/:mentorId", (req,res)=>{handleAssignStudents(req,res,Mentors,Students)})

//Student id should be passed as params, newMentorId should be passed in req.body
app.patch("/assignMentor/:studentId",(req,res)=>{handleAssignMentor(req,res,Mentors,Students)})

//show all students for perticular mentor
app.get("/studentsAssignedToMentor/:mentorId",(req,res)=>{handleStudentsAssignedToMentor(req,res,Mentors,Students)})

app.get("/allMentors", async (req,res)=>{
  let mentorsList=await Mentors.find()
  res.json(mentorsList)
})

app.get("/allStudents", async(req,res)=>{
  let studentsList=await Students.find()
  res.json(studentsList)
})

app.get("/unAssignedStudents",async(req,res)=>{
  let unAssignedStudents= await Students.find({assignedMentor:{ $exists: false }})
  // console.log(unAssignedStudents)
  res.json(unAssignedStudents)
})

app.listen(port,()=>{
    console.log("server is stated on port", port)
})