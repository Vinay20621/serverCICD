const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String},
    playLists:[{type:mongoose.SchemaTypes.ObjectId,ref:'Music'}],
    role:{type:String,default:'user'},
    createdAt:{type:Date,default:Date.now}
},{timestamps:true})
module.exports=mongoose.model('User',userSchema,'users')