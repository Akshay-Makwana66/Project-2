const express = require('express');
const router = express.Router();
const collegesController=require('../controllers/collegeController')
const internController=require('../controllers/internController')
const collegeValidations = require('../validations/collegeValidations')
const internValidations = require('../validations/internValidations')
router.post("/functionup/colleges",collegeValidations.collegeValidations,collegesController.createCollege)
router.post("/functionup/interns",internValidations.internValidations,internController.createIntern)

router.get("/functionup/collegeDetails",collegesController.getCollegeDetails)                     

module.exports = router;