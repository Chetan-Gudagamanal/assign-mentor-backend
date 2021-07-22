const handleCreateMentor=async(req,res,Mentors,Students)=>{
    
    // console.log(req.body)
    const {mentorName,mentorEmail}=req.body;
    try{
        
        const mentor=new Mentors({
            mentorName,
            mentorEmail,
            assignedStudentsIds:[]
        })
        await mentor.save();
        res.json(mentor)
        console.log("mentor created")
    }catch(err){
        res.status(500).json(err)
    }
}
export default handleCreateMentor;