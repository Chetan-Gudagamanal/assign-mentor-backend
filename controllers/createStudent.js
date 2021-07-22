const handleCreateStudent=async(req,res,Mentors,Students)=>{
    const {studentName,studentEmail}=req.body;
    try{
        const student=new Students({
            studentName,
            studentEmail,
            assignedMentorId:undefined
        })
        await student.save();
        res.json(student)
        console.log("student created")
    }catch(err){
        res.status(500).json(err)
    }
}
export default handleCreateStudent;