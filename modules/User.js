const {Schema,model} = require('mongoose')
const mongoose = require("mongoose");
const schema = new Schema({
    email: {type: String, require: true,unique:true},
    password : {type: String, require: true},
    username : {type:String,require: true},

    fullname: {type: String,default:''},
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
    job:{type: String,default:''},
    company:{type: String,default:''},
    companyExperience:{type: String,default:''},
    companyTime:{type: String,default:'' },
    jobSecond:{type: String,default:''},
    companySecond:{type: String,default:'' },
    companyExperienceSecond:{type: String,default:'' },
    companyTimeSecond:{type: String,default:'' },
    profile:{type: String,default:'' },
    age:{type: Number,default:0 },
    position:{type: String,default:'UI/UX Designer' },
    website:{type: String,default:'' },
    city:{type: String,default:'New-York' },
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