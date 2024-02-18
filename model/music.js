const mongoose=require('mongoose')
const musicSchema=new mongoose.Schema({
    name:{type:String},
    url:{type:String},
    user:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},
    
},{timestamps:true})
module.exports=mongoose.model('Music',musicSchema,'musics')