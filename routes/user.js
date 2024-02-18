const express=require('express')
const bcrypt=require('bcryptjs')
const {signToken}=require('../jwt')
const User=require('../model/user')
const router=express.Router()
router.post('/signin',async(req,res)=>
{
    try {
        const {username,email,password,cpassword}=req.body
        if(!username || !email || !password || !cpassword)
        {
            return res.json({status:'error',msg:'required feild!'})
             
        }
        if(password!==cpassword)
        {
            return res.json({status:'error',msg:'password is not match!'})
           
        }
        const userExist=await User.findOne({email:email})
        if(userExist)
        {
            return res.json({status:'error',msg:'user already exist!'})
           
            
        }
        const hashPassword=await bcrypt.hash(password,10)
        const user=await User.create({username,email,password:hashPassword})
        return  res.status(200).json({status:'success',msg:'created success'})
        

    } catch (error) {
        console.error('Error:', error);
    res.status(500).send('Internal Server Error');     
        
    }
})
router.post('/login',async(req,res)=>
{
    try {
        const {email,password}=req.body
        if(!email || !password)
        {
            return  res.json({status:'error',msg:'required feild!'})
            
        }
        const userExist=await User.findOne({email:email})
        if(!userExist)
        {
            return res.json({status:'error',msg:'unotherized user!'})
           
        }
        const checkPassword=await bcrypt.compare(password,userExist.password)
        if(!checkPassword)
        {
            return res.json({status:'error',msg:'unotherized user!'})
        }
        const token=signToken({id:userExist._id})
        const resUser={id:userExist._id,username:userExist.username,email:userExist.email}
        return  res.json({status:'ok',msg:resUser,token:token})       
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');      
        
    }
})

router.get('/alluser',async(req,res)=>
{
    try {
    // *************** it will not give all feild it give only username and email because it set 1 and by default
    // give id but we donot required id so you set set 0 *************************
        const allUser=await User.find({},{username:1,email:1,_id:1,role:1})
        return res.json({status:'success',user:allUser})
    } catch (error) {
        console.error('Error:', error);
    res.status(500).send('Internal Server Error'); 
    }
})
router.get('/:id',async(req,res)=>
{
    try {
        const id=req.params.id
        const user=await User.findOne({_id:id},{username:1,email:1})
        if(!user)
        {
            return res.json({status:'error',msg:'user is not found'})
        }
        return res.json({status:'success',msg:user})
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error'); 
    }

})
router.delete('/delete/:id',async(req,res)=>
{
    try {
        const id=req.params.id
        const user=await User.findByIdAndDelete(id)
        if(!user)
        {
            return res.json({status:'error',msg:'user is not found'})
        }
        return res.json({status:'success',msg:"user deleted successfully!"})
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error'); 
    }

})
router.patch('/:id/:feild',async(req,res)=>
{
    try {
        const id=req.params.id
        const feild=req.params.feild        

        const userExits=await User.findOne({_id:id})
        if(!userExits)
        {
            return res.json({status:'error',msg:'user not exists'})
        }
        if(feild==='username')
        {
            const user=await User.findByIdAndUpdate(id,{$set:{username:req.body.username}})
            const {_id,username,email}=user
            return res.json({status:'success',msg:{id:_id,username,email}})
        }
        else if(feild==='email')
        {
            const user=await User.findByIdAndUpdate(id,{$set:{email:req.body.email}})
            const {_id,username,email}=user
            return res.json({status:'success',msg:{id:_id,username,email}})
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error'); 
    }
})
module.exports=router
