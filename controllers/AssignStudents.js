

// //working with transaction, but producing error because 'npm i -g run-rs' is failing.
import mongoose from "mongoose"

const handleAssignStudents=async(req,res,Mentors,Students)=>{
    const {mentorId} = req.params;
    const {studentIds}=req.body;
    // console.log(mentorId)
    
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const mentor=await Mentors.findById(mentorId)
        // console.log(mentor)
        // console.log(studentIds)
        mentor.assignedStudentsIds=mentor.assignedStudentsIds.concat(studentIds)
        await mentor.save()

        studentIds.forEach(async id => {
          const student= await Students.findById(id)
            let tempObj={};
            tempObj["id"]=mentorId;
            tempObj["name"]=mentor.mentorName;
            tempObj["email"]=mentor.mentorEmail;
            student["assignedMentor"]=tempObj;

            // student["assignedMentorId"]=mentorId;
            await student.save()
        });

        await session.commitTransaction();
        res.json(mentor)
    }  catch (error) {
          // if anything fails above just rollback the changes here
        
          // this will rollback any changes made in the database
          await session.abortTransaction();
          
          // logging the error
          console.error(error);
          res.status(500).json(error);
          
          // rethrow the error
          throw error;
    } finally {
      // ending the session
      session.endSession();
    }

}

export default handleAssignStudents;



