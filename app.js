const express = require('express') ;
const mongoose = require('mongoose') ;
const bodyParser = require('body-parser') ;
const path = require("path") ;

const User = require('./models/User') ;


const authRoute = require("./routers/auth") ;
const studentRoute = require('./routers/student') ;
const placementRoute = require('./routers/trainingAndPlacement') ;
const aluminiRoute = require('./routers/alumini') ;
const errorRoute = require('./routers/errors') ;
const indexRoute = require('./routers/index') ;
const digiRoute = require('./routers/digiLocker') ;

const cors = require("cors");
var fs = require('fs');
var XLSX = require('xlsx');

const MONGODB_URI = "mongodb+srv://collegeproject:collegeproject@cluster0.axbqt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" ;

const session = require("express-session") ;
const MongodbStore = require("connect-mongodb-session")(session) ;

const store = new MongodbStore({
    uri:MONGODB_URI ,
    collection : 'sessions'
})


const app = express() ;

app.use(session({secret:'Its a secret' , resave:false , saveUninitialized:false , store:store , cookie:{maxAge:3600000}})) ;

app.use(express.static(path.join(__dirname ,'public'))) ;

app.set("view engine" , "ejs") ;

app.set("views" , "views") ;

app.use(bodyParser.urlencoded({extended:false})) ;

function createFile()
{
    let wb = XLSX.utils.book_new() ;
    wb.Props = {
        Title : "SheetJs Demo" ,
        Subject : "Test file" ,
        Author : "Anshul" ,
    }
    wb.SheetNames.push("Test Sheet") ;
    XLSX.writeFile(wb, 'out.xlsb');
    console.log("Hello") ;
}

createFile() ;

app.use(cors());

app.use(async (req , res , next) => {
    const filePath = `${__dirname}`;
    req.filePath = filePath ;
    if(req.session.user)
    {
        const id = req.session.user._id ;
        let user = await User.findById(id) ;
        if(user)
        {
            req.user = user ;
        }
    }
    next() ;
})

app.use(authRoute) ;
app.use(studentRoute) ;
app.use(placementRoute) ;
app.use(aluminiRoute) ;
app.use(errorRoute) ;
app.use(indexRoute) ;
app.use(digiRoute) ;

app.use((req , res , next) => {
    res.render("errors/404.ejs") ;
})

app.use((req , res , next , error) => {
    console.log(error) ;
    res.redirect("/500") ;
})


mongoose.connect(MONGODB_URI , { useNewUrlParser: true,  useUnifiedTopology: true }).
then(result => {
    console.log('Connected');
    app.listen(process.env.PORT || 3000);
})
.catch(err => {
    console.log(err);
})