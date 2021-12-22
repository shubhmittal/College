let Placement = require('../models/Placement') ;
let Student = require('../models/Student') ;
let XLSX = require('xlsx') ;
let User = require("../models/User");
let download = require('download');
let fs = require('fs');
let https = require('https');


module.exports.getPlacementProfile = async (req , res , next) => {
    try
    {
        let studentId = req.query.studentId ;
        if(studentId != " ")
        {
            studentId = studentId.trim() ;
        }
        let student = await Student.findOne({_id : studentId}).populate('placement') ;
        console.log(student) ;
        let isTPR = false ;
        if(req.user)
        {
            isTPR = req.user.isTPR ;
        }
        res.render('placement/placementProfile.ejs' , 
        {
            student : student ,
            isTPR : isTPR
            
        }) ;
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    } 
}

module.exports.getPlacementProfileByRollNumber = async (req , res , next) => {
    try
    {
        let rollNumber = req.body.rollNumber ;
        if(rollNumber != " ")
        {
            rollNumber = rollNumber.trim() ;
        }
        let student = await Student.findOne({rollNumber : rollNumber}).populate('placement') ;
        let isTPR = false ;
        console.log(req.user) ;
        if(req.user)
        {
            isTPR = req.user.isTPR ;
        }
        res.render('placement/placementProfile.ejs' , 
        {
            student : student ,
            isTPR : isTPR
        }) ;
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    } 
}

module.exports.getPlacementServices = async (req , res , next) => {
    try
    {
        res.render('placement/placementServices.ejs') ;
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

module.exports.getAllPlacementsByBranchAndYear = async (req , res , next) => {
    try
    {
        res.render('placement/allPlacementsByBranchAndYear.ejs' , {
            students : []
        }) ;
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

module.exports.getExcelAllPlacementsByBranchAndYear = async (req , res , next) => {
    try
    {
        res.render('placement/excelAllPlacementsByBranchAndYear.ejs') ;
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

module.exports.downloadExcelAllPlacementsByBranchAndYear = async (req , res , next) => {
    try
    {
        let branch = req.body.branch ;
        if(branch)
        {
            branch = branch.trim() ;
        }
        let year = req.body.year ;

        let students = await Student.find({nameOfDepartment : branch , year : year}).populate('placement') ;

        let arr = [] ;

        students.forEach(student => 
        {
            console.log(student) ;

            let obj1 = student.toObject() ;

            let temparr = [] ;

            temparr.push(student.studentName) ;
            temparr.push(student.rollNumber) ;
            temparr.push(student.nameOfDepartment) ;
            temparr.push(student.year) ;
            temparr.push(student.placement.company1) ;
            temparr.push(student.placement.package1) ;
            temparr.push(student.placement.company2) ;
            temparr.push(student.placement.package2) ;

            arr.push(temparr) ;
        })
        
        let wb = XLSX.utils.book_new() ;
            wb.Props = {
                Title : "SheetJs Demo" ,
                Subject : "Test file" ,
                Author : "Anshul" ,
            }
            wb.SheetNames.push("Test Sheet") ;

            let ws_data = arr ;

            console.log(ws_data) ;

            var ws = XLSX.utils.aoa_to_sheet(ws_data);

            wb.Sheets["Test Sheet"] = ws;

            let fileName = `placement_${branch}_${year}.xlsx` ;

            let fetchUrl = req.protocol + '://' + req.get('host') ;

            XLSX.writeFile(wb, `public/${fileName}`);
            let file = `${fetchUrl}/${fileName}`;
            let filePath = `${__dirname}/files`;  

            download(file , filePath)
            .then(() => {
                console.log('Download Completed');
            })

            let files = fs.createReadStream(`public/${fileName}`) ;

            res.writeHead(200 , {'Content-disposition' : `attachment;filename=public/${fileName}`}) ;

            files.pipe(res) ;

    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

module.exports.postGetAllPlacementsByBranchAndYear = async (req , res , next) => {
    try
    {
        let branch = req.body.branch ;
        let year = req.body.year ;

        let students = await Student.find({nameOfDepartment : branch , year : year}).populate('placement') ;

        res.render('placement/allPlacementsByBranchAndYear.ejs' , {
            students : students
        }) ;
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

module.exports.getPlacementDataByRollNumber = async (req , res , next) => {
    
    try
    {
        let rollNumber = req.query.rollNumber ; 
        if(rollNumber != " ")
        {
            rollNumber = rollNumber.trim() ;
        }

        let data = await Placement.findOne({rollNumber:rollNumber}) ;

        res.status(201).json({
            data : data 
        }) ;
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

module.exports.getFullStudentDataWithPlacement = async (req , res , next) => {
    try
    {
        let rollNumber = req.query.rollNumber ; 
        if(rollNumber != " ")
        {
            rollNumber = rollNumber.trim() ;
        }
        let data = await Student.findOne({rollNumber:rollNumber}).populate('placement');

        res.status(201).json({
            data : data
        })
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

module.exports.getAddPlacement = async (req , res , next) => {
    try
    {
        let studentId = req.query.studentId ;
        if(studentId != " ")
        {
            studentId = studentId.trim() ;
        }
        let student = await Student.findOne({_id : studentId}).populate('placement') ;
        res.render('placement/addplacement.ejs' , {
            student : student
        })
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

module.exports.postPlacementData = async (req , res , next) => {

    try
    {
        let rollNumber = req.body.rollNumber ;
        if(rollNumber != " ")
        {
            rollNumber = rollNumber.trim() ;
        }
        let company = req.body.company ;
        if(company != " ")
        {
            company = company.trim() ;
        }
        let package = req.body.package ;
        
        console.log(rollNumber , company , package) ;
        let data = await Placement.findOne({rollNumber : rollNumber}) ;

        if(data.package1 == 0)
        {
            data.package1 = package ;
            data.company1 = company ;
        }
        else if(data.package2 < package)
        {
            data.package2 = package ;
            data.company2 = company ;
        }

        await data.save() ;

        let student = await Student.findOne({rollNumber : rollNumber}).populate('placement') ;

        let isTPR = false ;
        if(req.user)
        {
            isTPR = req.user.isTPR ;
        }

        res.render('placement/placementProfile.ejs' , 
        {
            student : student ,
            isTPR : isTPR
        }) ;
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

module.exports.getStudentsDataForPlacementByBranchAndYear = async (req , res , next) => {
    try
    {
        let branch = req.query.branch ;
        if(branch != " ")
        {
            branch = branch.trim() ;
        }
        let year = req.query.year ;
        let students = await Student.find({year : year , nameOfDepartment : branch}).populate('placement') ;

        res.status(201).json({
            data : students
        }) ;
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

module.exports.downloadExcelPlacementConditional = async (req , res , next) => {
    try
    {
        let branch = req.body.branch ;
        if(branch != " ")
        {
            branch = branch.trim() ;
        }
        let year = req.body.year ;
        let maxPackage = req.body.maxPackage ;
        let students = await Student.find({year : year , nameOfDepartment : branch}).populate('placement') ;
        let nwStudents = [] ;
        students.forEach(student => {
            if(student.placement.package1 <= maxPackage && student.placement.package2 == 0)
            {
                nwStudents.push(student) ;
            }
        })
        
        students = nwStudents ;

        let arr = [] ;

        students.forEach(student => 
        {
            console.log(student) ;


            let temparr = [] ;

            temparr.push(student.studentName) ;
            temparr.push(student.rollNumber) ;
            temparr.push(student.nameOfDepartment) ;
            temparr.push(student.year) ;
            temparr.push(student.placement.company1) ;
            temparr.push(student.placement.package1) ;
            arr.push(temparr) ;
        })
        
        let wb = XLSX.utils.book_new() ;
            wb.Props = {
                Title : "SheetJs Demo" ,
                Subject : "Test file" ,
                Author : "Anshul" ,
            }
            wb.SheetNames.push("Test Sheet") ;

            let ws_data = arr ;

            console.log(ws_data) ;

            var ws = XLSX.utils.aoa_to_sheet(ws_data);

            wb.Sheets["Test Sheet"] = ws;

            let fileName = `placement_conditional_${branch}_${year}.xlsx` ;

            let fetchUrl = req.protocol + '://' + req.get('host') ;

            XLSX.writeFile(wb, `public/${fileName}`);
            let file = `${fetchUrl}/${fileName}`;
            let filePath = `${__dirname}/files`;  

            download(file , filePath)
            .then(() => {
                console.log('Download Completed');
            })

            let files = fs.createReadStream(`public/${fileName}`) ;

            res.writeHead(200 , {'Content-disposition' : `attachment;filename=public/${fileName}`}) ;

            files.pipe(res) ;

    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

module.exports.getExcelPlacementsConditionalFilter = async(req , res, next) => {
    try
    {
        res.render('placement/excelPlacementsConditionalFilter.ejs') ;
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}