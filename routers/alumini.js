const express = require('express');

const aluminiController = require("../controllers/alumini") ;
const isAuth = require('../middleware/isLoggedIn') ;

const router = express.Router();

router.get('/getAddAlumni' ,isAuth.isAuth , aluminiController.getAddAlumni) ;

router.post('/searchAlumni' , aluminiController.searchAlumniByNameOrCompany) ;

router.get('/getAllAluminiData' , aluminiController.getAllAluminiData) ;

router.get('/getAluminiDataByObjectId' , aluminiController.getAluminiByObectId ) ;

router.post('/postaddAluminiData' ,isAuth.isAuth ,aluminiController.postAddAluminiData) ;

router.get('/addExperience' , isAuth.isAuth , aluminiController.getAddExperience) ;

router.post('/addExperience' ,isAuth.isAuth , aluminiController.addExperience) ; 

module.exports = router ;