const express=require('express')
const { verifyToken } = require('../jwt')
const User = require('../model/user')
const router=express.Router()
router.get('/user',async(req,res)=>
{
    try { 
        const token=req.headers['token']        
        const verify=verifyToken(token)
        if(!token)
        {
            return res.json({status:'error'})
        }
       
        if(verify.status==='error')
        {
            return res.json({status:'error'})
        }
        const user=await User.findOne({_id:verify.id})
       
        if(!user)return res.json({status:'error'})
       
        return res.json({status:'success',user:{id:user._id,role:user.role}})
    } catch (error) {
        return res.json({status:'error'})
    }
})
module.exports=router