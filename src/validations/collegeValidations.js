const collegeModel = require("../models/collegeModel");

const collegeValidations = async function (req, res,next) {
  try {
    let college = req.body; 
    // Checks whether body is empty or not           

    if (Object.keys(college).length == 0)return res.status(400).send({ status: false, msg: "Body cannot be empty" });

    // Checks whether college name is empty or is enter as a string or contains only letters
    let name = college.name
    let duplicatename = await collegeModel.find({ name: name });

    if (duplicatename.length !== 0)return res.status(400).send({ status: false, msg: `${name} already exists` });

    if (!college.name)return res.status(400).send({ status: false, msg: "Please enter college name" });

    if (typeof college.name !== "string")return res.status(400).send({ status: false, msg: " Please enter college name as a String" });

    let validname = /^\w[a-zA-Z]*$/;                
                                               
    college.name = college.name.trim();         

    if (!validname.test(college.name))return res.status(400).send({ status: false, msg: "The college name may contain only small letters & not space between words or letter & numbers as well"});

    // Checks whether college fullName is empty or is enter as a string or contains only letters

    if (!college.fullName)return res.status(400).send({ status: false, msg: "Please enter college fullName" });

    if (typeof college.fullName !== "string")return res.status(400).send({ status: false, msg: "Please enter college fullName as a String" });

       let validfullName = /^\w[a-zA-Z.,\s]*$/;                     

       college.fullName = college.fullName.trim();     

       if (!validfullName.test(college.fullName))return res.status(400).send({ status: false, msg: "The college fullName may contain only letters" });
        
    // check link             

    if (!college.logoLink)return res.status(400).send({ status: false, msg: "Please enter college logoLink" });

    if (typeof college.logoLink !== "string")return res.status(400).send({ status: false, msg: "Please enter college logoLink as a String" });

    let validlogoLink = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(png|jpg|jpeg|gif|png|svg)$/

    college.logoLink = college.logoLink.trim();                                        

    if (!validlogoLink.test(college.logoLink))return res.status(400).send({ status: false, msg: "Enter valid college logoLink" });
    next();  
  } catch(error){      
    res.status(500).send({status: false, msg: error.message})
  }
};

  module.exports = {collegeValidations}