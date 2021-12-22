const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports.makeTPR = async (req , res , next) => {
  try
  {
    if(req.user)
    {
      let user = await User.findOne({_id : req.user._id}) ;
      user.isTPR = true ;
      await user.save() ;
      res.json({
        message : "Made TPR"
      })
    }
    else
    {
      res.render("errors/403.ejs")
    }
  }
  catch(err)
  {
    console.log(err) ;
    res.render("errors/500.ejs") ;
  }
}

module.exports.makeAdmin = async (req , res , next) => {
  try
  {
    if(req.user)
    {
      let user = await User.findOne({_id : req.user._id}) ;
      user.isAdmin = true ;
      await user.save() ;
      res.json({
        message : "Made admin"
      })
    }
    else
    {
      res.render("errors/403.ejs")
    }
  }
  catch(err)
  {
    console.log(err) ;
    res.render("errors/500.ejs") ;
  }
}

module.exports.getLogin = async (req , res , next) => {
  try{
    res.render("auth/login.ejs") ;
  }
  catch(err)
  {
    console.log(err) ;
    res.render("errors/500.ejs") ;
  }
}

module.exports.getSignup = async (req , res , next) => {
  try{
    res.render("auth/signup.ejs") ;
  }
  catch(err)
  {
    console.log(err) ;
    res.render("errors/500.ejs") ;
  }
}

module.exports.postLogin = async (req, res, next) => {
    try
    {
      //we need email and password as input
      let email = req.body.email;
      let password = req.body.password;
      let user = await User.findOne({ email: email });
      if (user) 
      {
        const isMatched = await bcrypt.compare(password, user.password);
        if (isMatched) 
        {
          req.session.user = user ;
          req.session.save( (err)=> {
              res.redirect('/') ;
          })
        } 
        else 
        {
          res.render('errors/generalError.ejs' , {
            errMessage : "email and password doesn't match"
          })
        }
      }
      else
      {
        res.render('errors/generalError.ejs' , {
          errMessage : "No user with this email exists"
        })
      }
    }
    catch (err)
    {
      console.log(err);
      res.render("errors/500.ejs") ;
    }
  };

  module.exports.postSignup = async (req, res, next) => {
    try {
      //we need firstName , lastName , email , password as input
      let name = req.body.name || " ";
      let email = req.body.email || " " ;
      let password = req.body.password || " " ;
      let confirmPassword = req.body.confirmPassword || " " ;
      if(password == confirmPassword)
      {
        let user = await User.findOne({ email: email });
        if (user) 
        {
          res.render('errors/generalError.ejs' , {
            errMessage : "User already exists"
          })
                
        } 
        else
        {
          const hashedPass = await bcrypt.hash(password, 12);
          user = new User({
            name : name , 
            email: email,
            password: hashedPass,
            isAdmin : false ,
            isTPR : false
          });
          user = await user.save();
          res.redirect('/login') ;
        }
      }
      else
      {
        res.render('errors/generalError.ejs' , {
          errMessage : "Passwords Do not match"
        })
      }
    }
    catch (err) {
      console.log(err);
      res.render("errors/500.ejs") ;
    }
  };


module.exports.getLogout = (req , res , next) => {
  try
  {
      req.session.destroy( (err) => {
          res.redirect('/') ;
      })
  }
  catch(err)
  {
      next(err) ;
  }
}