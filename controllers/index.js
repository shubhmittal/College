module.exports.getIndex = async (req , res , next) => {
    try
    {
        let isAlumni = false ;
        if(req.user && req.user.alumni)
        {
            isAlumni = true
        }
        res.render('index/index.ejs' ,
        {
            isAuth : req.user ,
            isAlumni : isAlumni
        }) ;
    }
    catch(err)
    {
        res.render('errors/500.ejs') ;
    }
}