const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    nameOfDepartment:{
        type:String ,
        required: true 
    } , 
    academicCourse : {
        type:String , 
        required : true 
    } ,
    academicCourseName : {
        type : String , 
        required:true 
    } ,
    stream : {
        type:String , 
        required : true
    } ,
    registrationNumber : {
        type:String ,
        required : true 
    } ,
    rollNumber : {
        type : String ,
        required : true 
    } ,
    aadhaarNumber : {
        type : String , 
        required : true 
    } ,
    digiLockerId : {
        type : String , 
        required : true 
    } ,
    studentName : {
        type : String ,
        required : true 
    } ,
    gender : {
        type : String , 
        required : true 
    } , 
    dateOfBirth : {
        type : String ,
        required : true 
    } ,
    studentMobileNumber : {
        type : String , 
        required : true 
    } ,
    studentEmail : {
        type : String ,
        required : true 
    } ,
    fatherName : {
        type : String ,
        required : true 
    } ,
    motherName : {
        type : String , 
        required : true 
    } ,
    CGPA : {
        type : Number , 
        required : true 
    } , 
    SGPA : {
        type : Number ,
        required : true
    } ,
    year : {
        type : Number
    } ,
    photo : {
        type : String
    } ,
    placement : {
        type : mongoose.Types.ObjectId ,
        ref : 'Placement'
    } ,
    website : {
        type : String
    } ,
    github : {
        type :String
    } ,
    twitter : {
        type : String
    } ,
    instagram : {
        type : String
    } ,
    facebook : {
        type : String
    }
}) ;

module.exports = mongoose.model("Student", StudentSchema);