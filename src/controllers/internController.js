const internModel=require('../models/internModel')
const collegeModel=require('../models/collegeModel')

const createIntern=async function(req,res){
   try{
       let data=req.body
       let savedData=await internModel.create(data)
       res.status(201).send({status:true,data:savedData})
   }catch(err){
    res.status(500).send({status:false,msg:err.message})
   }
}

const getCollegeDetails=async function(req,res){
    try{
    let getData=req.query
    
    }catch(err){
    res.status(500).send({status:false,msg:err.message})
    }
}

module.exports = {createIntern,getCollegeDetails}