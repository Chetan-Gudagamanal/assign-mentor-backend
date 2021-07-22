const handleAssignMentor=async(req,res,Mentors,Students)=>{
        const {studentId} = req.params;
        const {newMentorId}=req.body;
    //3 steps shoud be committed only if all 3 goes right else rolback, currently transaction not implimented
    try{
        const stud=await Students.findById(studentId);
        // console.log("found stud")
        if(stud.assignedMentor){
            let previousMentorId=stud.assignedMentor.id;
            // let previousMentorId=stud.assignedMentorId;
            // console.log(previousMentorId)

            //remove studentId from previous mentors assigned array
            const previousMentor=await Mentors.findById(previousMentorId);
            previousMentor.assignedStudentsIds=previousMentor.assignedStudentsIds.filter((id)=>id!=studentId)
            await previousMentor.save()
        }

        //update current mentors assigned array
        const newMentor=await Mentors.findById(newMentorId);
        // console.log(newMentor)
        let tempArr=[];
        tempArr.push(studentId)
        newMentor.assignedStudentsIds=newMentor.assignedStudentsIds.concat(tempArr)
        // newMentor.assignedStudentsIds.push(studentId)
        await newMentor.save()
        
        //update current stdents mentor
        const student=await Students.findById(studentId);
        let tempObj={};
        tempObj["id"]=newMentorId;
        tempObj["name"]=newMentor.mentorName;
        tempObj["email"]=newMentor.mentorEmail;
        
        student["assignedMentor"]=tempObj;
        // student.assignedMentorId=newMentorId
        await student.save()

        res.json(student)
        
    } catch(err){
        res.status(500).json(err)
    }
}

export default handleAssignMentor;