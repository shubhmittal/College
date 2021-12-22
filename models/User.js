const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    } ,
    student : {
        type : mongoose.Types.ObjectId ,
        ref : 'Student'
    } ,
    alumni : {
        type : mongoose.Types.ObjectId ,
        ref : 'Alumini'
    } ,
    isAdmin : {
        type : Boolean
    } ,
    isTPR : {
        type : Boolean
    }
}) ;

module.exports = mongoose.model("User", userSchema);