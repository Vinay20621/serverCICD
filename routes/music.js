const express=require('express')
const Music=require('../model/music')
const User=require('../model/user')

const router=express.Router()
router.get('/allmusic',async(req,res)=>
{
    try {
        const songs=await Music.find({})
        return res.json({status:'success',songs:songs})
    } catch (error) {
        console.log(error)
        return res.json({status:'error',msg:error})
    }
})
router.post('/addmusic',async(req,res)=>
{
    try {
        const {name,music,id}=req.body
        if(!music || !id || !name)
        {
            return res.json({status:'error',msg:"feild is required"})
        }
        const createMusic=await Music.create({
            name:name,
           url:music,
            user:id
        })
        return res.status(200).json({status:'success',song:createMusic})
    } catch (error) {
         console.log(error)
       return  res.json({status:'error',msg:error})
    }
})
router.patch('/user/add',async(req,res)=>
{
    try {
        
        const {songid,userid}=req.body
        if(!songid || !userid)
        {
            return res.json({status:'error',msg:"feild is required"})
        }
        const songExists=await Music.findById(songid)
        if(!songExists)
        {
            return  res.json({status:'error',msg:"song is not exists"})
        }
        const user=await User.findByIdAndUpdate(userid,{$push:{playLists:songid}})
        return res.status(200).json({status:'success',msg:"added sucessfully!"})
    } catch (error) {
         console.log(error)
       return  res.json({status:'error',msg:error})
    }
})
router.patch('/user/remove',async(req,res)=>
{
    try {
        
        const {songid,userid}=req.body
        if(!songid || !userid)
        {
            return res.json({status:'error',msg:"feild is required"})
        }
        const songExists=await Music.findById(songid)
        if(!songExists)
        {
            return  res.json({status:'error',msg:"song is not exists"})
        }    
        const user=await User.findByIdAndUpdate(userid,{$pull:{playLists:songid}})
        return res.status(200).json({status:'success',msg:"remove sucessfully!"})
    } catch (error) {
         console.log(error)
       return  res.json({status:'error',msg:error})
    }
})
router.delete('/delete/:id',async(req,res)=>
{
    try {
        const id=req.params.id
        const song=await Music.findByIdAndDelete(id)
        return res.status(200).json({status:'success',msg:"deleted song sucessfully!"})
    } catch (error) {
         console.log(error)
       return  res.json({status:'error',msg:error})
    }
})
module.exports=router