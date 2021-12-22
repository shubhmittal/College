let Student = require("../models/Student") ;
let Placement = require("../models/Placement") ;
let XLSX = require('xlsx') ;
let User = require("../models/User");
let download = require('download');
let fs = require('fs');
let https = require('https');

module.exports.postAddData = async (req , res , next) => {
    
    let studentId = req.body.studentId ;
    try
    {
        let student = await Student.findOne({_id : studentId}) ;
        student.nameOfDepartment = req.body.nameOfDepartment || " " ;
        if(student.nameOfDepartment != " ")
        {
            student.nameOfDepartment = student.nameOfDepartment.trim() ;
        }
        student.academicCourse = req.body.academicCourse || " ";
        if(student.academicCourse != " ")
        {
            student.academicCourse = student.academicCourse.trim() ;
        }
        student.academicCourseName = req.body.academicCourseName || " ";
        if(student.academicCourseName != " ")
        {
            student.academicCourseName = student.academicCourse.trim() ;
        }
        student.stream = req.body.stream || " ";
        if(student.stream != " ")
        {
            student.stream = student.stream.trim() ;
        }
        student.registrationNumber = req.body.registrationNumber || " " ;
        if(student.registrationNumber != " ")
        {
            student.registrationNumber = student.registrationNumber.trim() ;
        }
        student.rollNumber = req.body.rollNumber || " ";
        if(student.rollNumber != " ")
        {
            student.rollNumber = student.rollNumber.trim() ;
        }
        student.aadhaarNumber = req.body.aadhaarNumber|| " " ;
        if(student.aadhaarNumber != " ")
        {
            student.aadhaarNumber = student.aadhaarNumber.trim() ;
        }
        student.digiLockerId = req.body.digiLockerId || " ";
        if(student.digiLockerId != " ")
        {
            student.digiLockerId = student.digiLockerId.trim() ;
        }
        student.studentName = req.body.studentName || " ";
        if(student.studentName != " ")
        {
            student.studentName = student.studentName.trim() ;
        }
        student.gender = req.body.gender || " ";
        if(student.gender != " ")
        {
            student.gender = student.gender.trim() ;
        }
        student.dateOfBirth = req.body.dateOfBirth || " ";
        if(student.dateOfBirth != " ")
        {
            student.dateOfBirth = student.dateOfBirth.trim() ;
        }
        student.studentMobileNumber = req.body.studentMobileNumber || " ";
        if(student.studentMobileNumber != " ")
        {
            student.studentMobileNumber = student.studentMobileNumber.trim() ;
        }
        student.studentEmail = req.body.studentEmail || " ";
        if(student.studentEmail != " ")
        {
            student.studentEmail = student.studentEmail.trim() ;
        }
        student.fatherName = req.body.fatherName || " ";
        if(student.fatherName != " ")
        {
            student.fatherName = student.fatherName.trim() ;
        }
        student.motherName = req.body.motherName || " ";
        if(student.motherName != " ")
        {
            student.motherName = student.motherName.trim() ;
        }
        student.CGPA = req.body.CGPA || 0;
        student.SGPA = req.body.SGPA || 0;
        student.year = req.body.year || 0; 
        student.photo = req.body.photo || " ";
        if(student.photo != " ")
        {
            student.photo = student.photo.trim() ;
        }
        student.website = req.body.website || " " ;
        if(student.website != " ")
        {
            student.website = student.website.trim() ;
        }
        student.github = req.body.github || " " ;
        if(student.github != " ")
        {
            student.github = student.github.trim() ;
        }
        student.twitter = req.body.twitter || " " ;
        if(student.twitter != " ")
        {
            student.twitter = student.twitter.trim() ;
        }
        student.instagram = req.body.instagram || " " ;
        if(student.instagram != " ")
        {
            student.instagram = student.instagram.trim() ;
        }
        student.facebook = req.body.facebook || " " ;
        if(student.facebook != " ")
        {
            student.facebook = student.facebook.trim() ;
        }

        let tempStudent = await Student.findOne({rollNumber : student.rollNumber}) ;

        if(tempStudent)
        {
            res.render('errors/generalError.ejs' , {
                errMessage : 'This roll number already exists.'
            })
        }
        else
        {
    
            student = await student.save() ;

            console.log(student) ;

            let placement = await Placement.findOne({_id : student.placement}) ;
            placement.rollNumber = student.rollNumber ;
            await placement.save() ;

            res.render("student/studentProfile.ejs" , {
                student : student
            })
        }
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }

}

module.exports.getAllStudentsData = async (req , res , next) => {
    try
    {
        let students = await Student.find() ;
        res.status(201).json({
            students : students
        })
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

module.exports.getYearResultByCgpa = async (req , res , next) => {
    try
    {
        let year = req.query.year ;
        year = year.trim() ;
        console.log(year) ;
        let students = await Student.find().sort({'CGPA' : 'desc'}) ;
        console.log(students) ;
        let result = [] ;

        let rank = 1 ;
        students.forEach((student) => {
            if(result.length == 0)
            {
                let obj = {
                    name : student.studentName ,
                    rollNumber : student.rollNumber ,
                    rank : rank ,
                    CGPA : student.CGPA ,

                } ;
                result.push(obj) ;
            }
            else
            {
                let ind = result.length - 1 ;
                if(result[ind].CGPA == student.CGPA)
                {

                }
                else{
                    rank++ ;
                }
                let obj = {
                    name : student.studentName ,
                    rollNumber : student.rollNumber ,
                    rank : rank ,
                    CGPA : student.CGPA
                } ;
                result.push(obj) ;
            }
        })

        res.status(201).json({
            result : result
        })
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

module.exports.getStudentProfile = async (req , res , next) => {
    try
    {
        let user = req.user ;
        let tempStudent = await Student.findOne({_id : user.student}) ;
        if(tempStudent) 
        {
            res.render('student/studentProfile.ejs' , {
                student : tempStudent
            })
        }
        else
        {
            let student = new Student({
                nameOfDepartment : " " ,
                academicCourse : " " ,
                academicCourseName : " " ,
                stream : " " ,
                registrationNumber : " " ,
                rollNumber : " " ,
                aadhaarNumber : " " ,
                digiLockerId : " " ,
                studentName : user.name ,
                gender : " " ,
                dateOfBirth : " " ,
                studentMobileNumber : " " ,
                studentEmail : user.email ,
                fatherName : " " ,
                motherName : " " , 
                CGPA : 0 ,
                SGPA : 0 ,
                photo : " " ,
                year : 0
            }) ;
    
            
            student = await student.save() ;
    
            let placement = new Placement({
                rollNumber : student.rollNumber ,
                student : student._id ,
                package1 : 0 ,
                package2 : 0 ,
                company1 : "Not Placed" ,
                company2 : "Not Placed"
            })
    
            placement = await placement.save() ;
    
            student.placement = placement._id ;
    
            student = await student.save() ;

            user.student = student._id ;

            await user.save() ;

            res.render('student/studentProfile.ejs' ,
            {
                student : student
            })
        }
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

module.exports.getEditStudentProfile = async (req , res , next) => {
    try
    {
        let user = req.user ;
        let tempStudent = await Student.findOne({_id : user.student}) ;
        res.render('student/editStudentProfile.ejs', {
            student : tempStudent
        })
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

module.exports.getAllResults = async (req , res , next) => {
    try
    {
        res.render('results/Allresults.ejs' , {
            students : []
        })
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

module.exports.getYearResultByBranch = async (req , res , next) => {
    try
    {
        let type = req.body.type ;
        if(type != " ")
        {
            type = type.trim() ;
        }
        let year = req.body.year ;
        if(year != " ")
        {
            year = year.trim() ;
        }
        let branch = req.body.branch ;
        if(branch != " ")
        {
            branch = branch.trim() ;
        }
        let students ;
        if(type == "CGPA")
        {
            students = await Student.find({year : year , nameOfDepartment : branch}).sort({'CGPA' : 'desc'}) ;
            
            let result = [] ;

            let rank = 1 ;
            students.forEach((student) => {
                if(result.length == 0)
                {
                    let obj = {
                        name : student.studentName ,
                        rollNumber : student.rollNumber ,
                        rank : rank ,
                        CGPA : student.CGPA ,
                        SGPA : student.SGPA ,
                        branch : student.nameOfDepartment
                    } ;
                    result.push(obj) ;
                }
                else
                {
                    let ind = result.length - 1 ;
                    if(result[ind].CGPA == student.CGPA)
                    {

                    }
                    else{
                        rank++ ;
                    }
                    let obj = {
                        name : student.studentName ,
                        rollNumber : student.rollNumber ,
                        rank : rank ,
                        CGPA : student.CGPA ,
                        SGPA : student.SGPA ,
                        branch : student.nameOfDepartment
                    } ;
                    result.push(obj) ;
                }
            })

            res.render('results/Allresults.ejs' , {
                students : result
            })
        }
        else if(type == "SGPA")
        {
            students = await Student.find({year : year , nameOfDepartment : branch}).sort({'CGPA' : 'desc'}) ;
            
            let result = [] ;

            let rank = 1 ;
            students.forEach((student) => {
                if(result.length == 0)
                {
                    let obj = {
                        name : student.studentName ,
                        rollNumber : student.rollNumber ,
                        rank : rank ,
                        CGPA : student.CGPA ,
                        SGPA : student.SGPA ,
                        branch : student.nameOfDepartment
                    } ;
                    result.push(obj) ;
                }
                else
                {
                    let ind = result.length - 1 ;
                    if(result[ind].CGPA == student.CGPA)
                    {

                    }
                    else{
                        rank++ ;
                    }
                    let obj = {
                        name : student.studentName ,
                        rollNumber : student.rollNumber ,
                        rank : rank ,
                        CGPA : student.CGPA ,
                        SGPA : student.SGPA ,
                        branch : student.nameOfDepartment
                    } ;
                    result.push(obj) ;
                }
            })

            res.render('results/Allresults.ejs' , {
                students : result
            })
        }
        else
        {
            res.render("errors/generalError" , {
                errMessage : "Enter either CGPA or SGPA"
            })
        }
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

getYearResultByCgpaAndBranch = async (req , res , next) => {
    try
    {
        let year = req.body.year ;
        if(year != " ")
        {
            year = year.trim() ;
        }
        let branch = req.body.branch ;
        if(branch != " ")
        {
            branch = branch.trim() ;
        }
        let students = await Student.find({year : year , nameOfDepartment : branch}).sort({'CGPA' : 'desc'}) ;

        let result = [] ;

        let rank = 1 ;
        students.forEach((student) => {
            if(result.length == 0)
            {
                let obj = {
                    name : student.studentName ,
                    rollNumber : student.rollNumber ,
                    rank : rank ,
                    CGPA : student.CGPA ,
                    SGPA : student.SGPA ,
                    branch : student.nameOfDepartment
                } ;
                result.push(obj) ;
            }
            else
            {
                let ind = result.length - 1 ;
                if(result[ind].CGPA == student.CGPA)
                {

                }
                else{
                    rank++ ;
                }
                let obj = {
                    name : student.studentName ,
                    rollNumber : student.rollNumber ,
                    rank : rank ,
                    CGPA : student.CGPA ,
                    SGPA : student.SGPA ,
                    branch : student.nameOfDepartment
                } ;
                result.push(obj) ;
            }
        })

        res.render("results/Allresuls.ejs" , {
            students : result
        })
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

getYearResultBySgpaAndBranch = async (req , res , next) => {
    try
    {
        let year = req.body.year ;
        if(year != " ")
        {
            year = year.trim() ;
        }
        let branch = req.body.branch ;
        if(branch != " ")
        {
            branch = branch.trim() ;
        }
        let students = await Student.find({year : year , nameOfDepartment : branch}).sort({'SGPA' : 'desc'}) ;

        let result = [] ;

        let rank = 1 ;
        students.forEach((student) => {
            if(result.length == 0)
            {
                let obj = {
                    name : student.studentName ,
                    rollNumber : student.rollNumber ,
                    rank : rank ,
                    SGPA : student.SGPA ,
                    CGPA : student.CGPA ,
                    branch : student.nameOfDepartment
                } ;
                result.push(obj) ;
            }
            else
            {
                let ind = result.length - 1 ;
                if(result[ind].SGPA == student.SGPA)
                {

                }
                else{
                    rank++ ;
                }
                let obj = {
                    name : student.studentName ,
                    rollNumber : student.rollNumber ,
                    rank : rank ,
                    CGPA : student.CGPA ,
                    SGPA : student.SGPA ,
                    branch : student.nameOfDepartment
                } ;
                result.push(obj) ;
            }
        })

        res.render("results/Allresuls.ejs" , {
            students : result
        })
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

module.exports.getYearResultBySgpa = async (req , res , next) => {
    try
    {
        let year = req.query.year ;
        year = year.trim() ;
        let students = await Student.find({year : year}).sort({'SGPA' : 'desc'}) ;
        let result = [] ;

        let rank = 1 ;
        students.forEach((student) => {
            if(result.length == 0)
            {
                let obj = {
                    name : student.studentName ,
                    rollNumber : student.rollNumber ,
                    rank : rank ,
                    SGPA : student.SGPA ,
                    CGPA : student.CGPA
                } ;
                result.push(obj) ;
            }
            else
            {
                let ind = result.length - 1 ;
                if(result[ind].SGPA == student.SGPA)
                {

                }
                else{
                    rank++ ;
                }
                let obj = {
                    name : student.studentName ,
                    rollNumber : student.rollNumber ,
                    rank : rank ,
                    CGPA : student.CGPA ,
                    SGPA : student.SGPA
                } ;
                result.push(obj) ;
            }
        })

        res.status(201).json({
            result : result
        })
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

module.exports.getStudentByRollNo= async (req , res , next) => {
    try
    {
        // let rollNumber = req.query.rollNumber ;
        let students = await Student.find() ;
        let arr = [] ;

        students.forEach(student => 
        {
            console.log(student) ;

            let obj1 = student.toObject() ;


            let temparr = [] ;

            for(let key in obj1)
            {
                temparr.push(obj1[key]) ;
            }

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

            XLSX.writeFile(wb, 'public/out2.xlsb');
            let file = 'http://localhost:3000/out2.xlsb';
            let filePath = `${__dirname}/files`;
            let url = 'out2.xlsb';
  

            download(file , filePath)
            .then(() => {
                console.log('Download Completed');
            })


            res.status(201).json({
                message : "added"
            })
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}