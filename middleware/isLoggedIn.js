module.exports.isAuth = (req , res , next) => {
    if(req.user)
    {
        next() ;
    }
    else
    {
        res.render('errors/403.ejs') ;
    }
}