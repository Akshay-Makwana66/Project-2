const internModel=require('../models/internModel')
const collegeModel=require('../models/collegeModel')

const createIntern=async function(req,res){
   try{
    const data = req.body        
    let college= await collegeModel.findOne({name: data.collegeName}).select({_id:1})
    console.log(college)
    if(!college) return res.status(404).send({status: false, msg: `No College name found with ${data.collegeName.trim()}`})
    data.collegeId = college._id     
    const savedData = await internModel.create(data)
    res.status(201).send({status:true, message: "Internship application successful.",data: savedData})
   }catch(err){
    res.status(500).send({status:false,msg:err.message})
   }        
}


 module.exports = {createIntern}             