const jwt=require('jsonwebtoken')
require('dotenv').config()
const KEY=process.env.KEY
const signToken=(playload)=>
{
    return jwt.sign(playload,KEY,{expiresIn:'10m'})
}
const verifyToken=(token)=>
{
   try {
    const verified = jwt.verify(token, KEY);
    if (verified) {
        
        return {status:'success',id:verified.id};
    } else {
        // Access Denied
        return {status:'error',error:"unotherized"};
    }
} catch (error) {
    // Access Denied
    return {status:'error',error:error};
}
}
module.exports={signToken,verifyToken}