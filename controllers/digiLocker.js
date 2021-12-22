const Student = require("../models/Student") ;
const Placement = require("../models/Placement") ;
const XLSX = require('xlsx') ;
const User = require("../models/User");
const download = require('download');
const fs = require('fs');
const https = require('https');


module.exports.getBranchAndYearFilter = async (req , res , next) => {
    try
    {
        res.render('digilocker/branchAndYearFilter.ejs') ;
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ; 
    }
}

module.exports.getExcelOnBranchAndYear = async (req , res , next) => {
    try
    {
        // const rollNumber = req.query.rollNumber ;
        let branch = req.body.branch ;
        if(branch)
        {
            branch = branch.trim() ;
        }
        let year = req.body.year ; 
        const students = await Student.find({nameOfDepartment : branch , year : year}) ;
        let arr = [] ;

        students.forEach(student => 
        {
            console.log(student) ;

            let obj1 = student.toObject() ;

            let temparr = [] ;

            for(const key in obj1)
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

            let fileName = `digiLocker_${branch}_${year}.xlsx` ;

            let fetchUrl = req.protocol + '://' + req.get('host') ;


            XLSX.writeFile(wb, `public/${fileName}`);
            const file = `${fetchUrl}/${fileName}`;
            const filePath = `${__dirname}/files`;  

            download(file , filePath)
            .then(() => {
                console.log('Download Completed');
            })

            const files = fs.createReadStream(`public/${fileName}`) ;

            res.writeHead(200 , {'Content-disposition' : `attachment;filename=public/${fileName}`}) ;

            files.pipe(res) ;

            
            
            // res.status(201).json({
            //     message : "added"
            // })
    }
    catch(err)
    {
        console.log(err)
        res.render("errors/500.ejs") ;
    }
}