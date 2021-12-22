const express = require('express');

const tNpController = require("../controllers/trainingAndPlacement") ;

const router = express.Router();

router.get('/getPlacementProfile' , tNpController.getPlacementProfile) ;

router.get('/getPlacementServices' , tNpController.getPlacementServices) ;

router.get('/getPlacementDataByRollNumber' , tNpController.getPlacementDataByRollNumber) ;

router.get('/getFullStudentDataWithPlacement' , tNpController.getFullStudentDataWithPlacement) ;

router.get('/getStudentsDataForPlacementByBranchAndYear' , tNpController.getStudentsDataForPlacementByBranchAndYear) ;

// router.get('/getStudentsDataForPlacementConditional' , tNpController.getStudentsDataForPlacementConditional) ;

router.post('/postPlacementData' , tNpController.postPlacementData) ;

router.post('/getPlacementProfileByRollNumber' , tNpController.getPlacementProfileByRollNumber) ;

router.get('/getAllPlacementsByBranchAndYear' , tNpController.getAllPlacementsByBranchAndYear) ;

router.get('/getAddPlacement' , tNpController.getAddPlacement) ;

router.post('/getAllPlacementsByBranchAndYear' , tNpController.postGetAllPlacementsByBranchAndYear) ;

router.get('/getExcelAllPlacementsByBranchAndYear' , tNpController.getExcelAllPlacementsByBranchAndYear) ;

router.post('/downloadExcelAllPlacementsByBranchAndYear' , tNpController.downloadExcelAllPlacementsByBranchAndYear) ;

router.get('/excelPlacementsConditionalFilter' , tNpController.getExcelPlacementsConditionalFilter) ;

router.post('/downloadExcelPlacementConditional' , tNpController.downloadExcelPlacementConditional) ;

module.exports = router ;