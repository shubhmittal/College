const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const aluminiSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    bio : {
        type : String 
    },
    currentCompany: {
        type: String ,
        required : true
    } ,
    currentPosition : {
        type : String ,
        required : true
    } ,
    passoutYear : {
        type : Number ,
        required : true
    } ,
    gender : {
        type : String 
    } ,
    experience : [
        {
            nameOfCompany : {
                type : String ,
                required : true 
            } ,
            startingDate : {
                type : String ,
                required : true 
            } ,
            endingDate : {
                type : String , 
                required : true
            } ,
            monthsOfExperience : {
                type : Number ,
                required : true 
            } ,
            position : {
                type : String , 
                required : true
            }
        }
    ]
}) ;

module.exports = mongoose.model("Alumini", aluminiSchema);