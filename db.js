const mongoose=require('mongoose')
require('dotenv').config()
const db=async()=>
{
    try {
        const res=await mongoose.connect(process.env.MONGO_URL)
        
    } catch (error) {
        
        console.log(error)
    }
}
module.exports=db