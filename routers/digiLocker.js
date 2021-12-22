const express = require("express");
const dgController = require("../controllers/digiLocker");
const router = express.Router();

router.get('/branchAndYearFilter' , dgController.getBranchAndYearFilter) ;

router.post('/getExcelOnBranchAndYear' , dgController.getExcelOnBranchAndYear) ;

module.exports = router ;