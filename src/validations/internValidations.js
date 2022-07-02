const internModel = require("../models/internModel");
const internValidations = async function (req, res,next) {
  try { 
    let college = req.body;
    // Checks whether body is empty or not

    if (Object.keys(college).length == 0)return res.status(400).send({ status: false, msg: "Body cannot be empty" })
    let name = college.name
    if (!name)return res.status(400).send({ status: false, msg: "Please enter intern name" });
    if (typeof name !== "string")return res.status(400).send({ status: false, msg: " Please enter intern name as a String" });
    let validname = /^\w[a-zA-Z.\s]*$/;  
    college.name = college.name.trim();         

    if (!validname.test(college.name))return res.status(400).send({ status: false, msg: "The intern name may contain only letters & not space between words or letter & not number as well"});

    if (!college.email)return res.status(400).send({ status: false, msg: "Please enter E-mail" });

    if (typeof college.email !== "string")return res.status(400).send({ status: false, msg: "Please enter email as a String" });

    let email = college.email;

    if (!/^([0-9a-z]([-_\\.]*[0-9a-z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/.test(email))return res.status(400).send({ status: false, msg: "Entered email is invalid" });

    let duplicateEmail = await internModel.find({ email: email });

    if (duplicateEmail.length !== 0)return res.status(400).send({ status: false, msg: `${email} already exists` });

    if (!college.mobile)return res.status(400).send({ status: false, msg: "Please Enter Mobile Number" });
    if (typeof college.mobile !== "number")return res.status(400).send({ status: false, msg: " Please enter only number of 10 digits & don't put in string" });
    let validMobile = /^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/
    if (!validMobile.test(college.mobile))return res.status(400).send({ status: false, msg: "The intern mobile number may contain only 10 number"});
    let mobile = college.mobile;
    let duplicateMobile = await internModel.find({ mobile: mobile });
    if (duplicateMobile.length !== 0)return res.status(400).send({ status: false, msg: `${mobile} already exists` });

    let internCollegeName = req.body.collegeName;
    if (!internCollegeName) return res.status(400).send({ status: false, msg: "Enter collegeName"});
    if (typeof internCollegeName !== "string")return res.status(400).send({ status: false, msg: " Please enter internCollegeName as a String" });
    let validInternCollegeName = /^\w[a-zA-Z.\s]*$/;  

    if (!validInternCollegeName.test(internCollegeName.collegeName))return res.status(400).send({ status: false, msg: "The internCollegeName may contain only small letters & not space between words or letter"});

    next();
} catch (error) {
    console.log(error);
    res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports = { internValidations };
         
