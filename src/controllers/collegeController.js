const collegeModel=require('../models/collegeModel')
const internModel=require('../models/internModel')


const createCollege=async function(req,res){ 
   try{
       let data=req.body
       let savedData=await collegeModel.create(data)
       res.status(201).send({status:true,data:savedData})                 
   }catch(err){   
    res.status(500).send({status:false,msg:err})
   }
}                                                
    
const getCollegeDetails = async function (req, res) {
    // res.setHeader('Access-Control-Allow-Origin','*')
    try {  
        const userQuery = req.query
         if (Object.keys(userQuery).length == 0)return res.status(400).send({ status: false, message: "Query Params Cannot Be Empty, Write CollegeName" })
         
        const collegeName = req.query.collegeName       
        const getCollegeName = await collegeModel.findOne({ name: collegeName, isDeleted: false })

        if (!getCollegeName) return res.status(404).send({ status: false, message: "No colleges found with this name" })

        const getCollegeId = getCollegeName._id
        const Interns = await internModel.find({collegeId: getCollegeId, isDeleted: false}).select({ name: 1, email: 1, mobile: 1 })


        if (Interns.length === 0) return res.status(404).send({ status: false, message: `No Internship applications submitted at ${collegeName} till now.` })

        const allInterns = {
            name: getCollegeName.name,
            fullName: getCollegeName.fullName,
            logoLink: getCollegeName.logoLink,
            interns: Interns
        }
        res.status(200).send({ status: true, data: allInterns })
    }catch (err) {     
      console.log("This is the error :", err.message);
      return res.status(500).send({ status: false, message: "Error", error: err.message });
    }
  }

 module.exports = {createCollege,getCollegeDetails}