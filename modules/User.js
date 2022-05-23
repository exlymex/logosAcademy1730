const {Schema,model} = require('mongoose')
const mongoose = require("mongoose");
const schema = new Schema({
    email: {type: String, require: true,unique:true},
    password : {type: String, require: true},
    username : {type:String,require: true},
    name: {type: String,default:''},
    title:{type: String,default:''},
    aboutMe:{type: String,default:''},
    courses:{type: String,default:''},
    coursesName:{type: String,default:''},
    coursesTime:{type: String,default:''},
    coursesGratuation:{type: String,default:''},
    coursesSecond:{type: String,default:''},
    coursesNameSecond:{type: String,default:''},
    coursesTimeSecond:{type: String,default:''},
    coursesGratuationSecond:{type: String,default:''},
    userImage:{type: String,default:'' },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
})

module.exports = model('User',schema)