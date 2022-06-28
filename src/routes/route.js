const express = require('express');
const router = express.Router();
const collegesController=require('../controllers/collegeController')
const internController=require('../controllers/internController')


router.post("/functionup/colleges",collegesController.createCollege)
router.post("/functionup/interns",internController.createIntern)

router.get("/functionup/collegeDetails",collegesController.getCollegeDetails)

module.exports = router;