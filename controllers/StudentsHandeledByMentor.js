const handleStudentsAssignedToMentor=async(req,res,Mentors,Students)=>{
    const {mentorId}=req.params;
    try{
        const mentor=await Mentors.findById(mentorId)
        const studentsAssignedToMentor = await Students.find({_id: {$in:mentor.assignedStudentsIds}});
        res.json(studentsAssignedToMentor)
    } catch(err){
        res.status(500).json(err)
    }
}
export default handleStudentsAssignedToMentor;
