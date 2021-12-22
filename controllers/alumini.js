const Alumini = require('../models/Alumini') ;

module.exports.getAllAluminiData = async (req , res , next) => {
    try
    {
        let aluminis = await Alumini.find() ;
        res.render('alumni/AllAlumni.ejs' , {
            data : aluminis
        })
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ; 
    }
}


module.exports.searchAlumniByNameOrCompany = async (req , res , next) => {
    try
    {
        let search = req.body.search ;
        search = search.trim() ;
        if(search)
        {
            let alumni = [] ;
            let tempAlumini1 = await Alumini.find({name : search}) ;
            let tempAlumini2 = await Alumini.find({currentCompany : search}) ;
            alumni = tempAlumini1.concat(tempAlumini2) ;
            res.render('alumni/AllAlumni.ejs' , {
                data : alumni
            })
        }
        else
        {
            let aluminis = await Alumini.find() ;
            res.render('alumni/AllAlumni.ejs' , {
                data : aluminis
            })
        }
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ; 
    }
}

module.exports.getAddAlumni = async (req , res , next) => {
    try
    {
        res.render('alumni/addAlumni.ejs' , {
            user : req.user
        })
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ; 
    }
}

module.exports.getAluminiByObectId = async (req , res , next) => {
    try
    {
        let objectId = req.query.aluminiId ;
        let canAddExperience = false ;
        if(req.user && req.user.alumni && req.user.alumni.toString() == objectId.toString())
        {
            canAddExperience = true ;
        }
        objectId = objectId.trim() ;
        let alumini = await Alumini.findById(objectId) ;
        console.log(alumini) ;
        res.render('alumni/singleAlumniProfile.ejs' , {
            alumni : alumini ,
            canAddExperience : canAddExperience
        }) ; ;
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

module.exports.postAddAluminiData = async (req , res , next) => {
    try
    {
        let name = req.body.name || " ";
        if(name != " ")
        {
            name = name.trim() ;
        }
        let email = req.body.email || " ";
        if(email != " ")
        {
            email = email.trim() ;
        }
        let currentCompany = req.body.company || " ";
        if(currentCompany != " ")
        {
            currentCompany = currentCompany.trim() ;
        }
        let bio = req.body.bio || " ";
        if(bio != " ")
        {
            bio = bio.trim() ;
        }
        let gender = req.body.gender || " ";
        if(gender != " ")
        {
            gender = gender.trim() ;
        }
        let passoutYear = req.body.passoutYear || " " ;
        if(passoutYear != " ")
        {
            passoutYear = passoutYear.trim() ;
        }
        let position = req.body.position || " ";
        if(position != " ")
        {
            position = position.trim() ;
        }

        let alumini = new Alumini({
            name : name ,
            email : email ,
            currentCompany : currentCompany ,
            bio : bio ,
            gender : gender ,
            passoutYear : passoutYear ,
            currentPosition : position ,
            experience : []
        })

        alumini = await alumini.save() ;

        let user = req.user ;
        user.alumni = alumini._id ;
        await user.save() ;

        res.redirect(`/getAluminiDataByObjectId?aluminiId=${alumini._id}`) ;

    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

module.exports.getAddExperience = async (req , res , next) => {
    try
    {
        res.render("alumni/addExperience.ejs") ;
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}

module.exports.addExperience = async (req , res , next) => {
    try
    {
        let nameOfCompany = req.body.nameOfCompany ;
        if(nameOfCompany)
        {
            nameOfCompany = nameOfCompany.trim() ;
        }
        let startingDate = req.body.startingDate ;
        if(startingDate)
        {
            startingDate = startingDate.trim() ;
        }
        let endingDate = req.body.endingDate ;
        if(endingDate)
        {
            endingDate = endingDate.trim() ;
        }
        let monthsOfExperience = req.body.monthsOfExperience ;
        if(monthsOfExperience)
        {
            monthsOfExperience = monthsOfExperience.trim() ;
        }
        let position = req.body.position ;
        if(position)
        {
            position = position.trim() ;
        }

        let obj = {
            nameOfCompany : nameOfCompany ,
            startingDate : startingDate ,
            endingDate : endingDate ,
            monthsOfExperience : monthsOfExperience ,
            position : position
        } ;

        let aluminiId = req.user.alumni ;

        console.log(req.user) ;

        console.log(aluminiId) ;

        let alumini = await Alumini.findOne({_id : aluminiId}) ;

        console.log(alumini) ;

        alumini.experience.push(obj) ;

        await alumini.save() ;

        res.redirect(`/getAluminiDataByObjectId?aluminiId=${aluminiId}`) ;
    }
    catch(err)
    {
        console.log(err) ;
        res.render("errors/500.ejs") ;
    }
}