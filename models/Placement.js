const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlacementSchema = new Schema({
    package1 : {
        type : Number ,
        required : true
    } ,
    company1 : {
        type : String 
    } ,
    package2 : {
        type : Number,
        required : true
    } ,
    company2 : {
        type :String 
    } ,
    rollNumber : {
        type : String , 
        required : true
    } ,
    student : {
        type : mongoose.Types.ObjectId ,
        ref : 'Student'
    }
})

module.exports = mongoose.model("Placement", PlacementSchema);