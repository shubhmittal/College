const express = require('express');

const studentController = require("../controllers/student") ;

const isAuth = require("../middleware/isLoggedIn") ;

const router = express.Router();

router.get('/getAllResults' , studentController.getAllResults) ;

router.get('/getStudentProfile' , isAuth.isAuth , studentController.getStudentProfile) ;

router.get('/getEditStudentProfile' , studentController.getEditStudentProfile) ;

router.get('/getAllStudentsData' , studentController.getAllStudentsData) ;

router.get('/getStudentByRollNo' , studentController.getStudentByRollNo) ;

router.post('/postAddStudentData' , studentController.postAddData) ;

router.get('/getYearResultByCgpa' , studentController.getYearResultByCgpa) ;

router.get('/getYearResultBySgpa' , studentController.getYearResultBySgpa) ;

router.post('/getYearResultByBranch' , studentController.getYearResultByBranch) ;


module.exports = router ;