const express=require('express')
const cors=require('cors')
const db=require('./db')
require('dotenv').config()
const userRouter=require('./routes/user')
const authRouter=require('./routes/auth')
const musicRouter=require('./routes/music')

const app=express()
app.use(cors({
    origin:'*',
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT=process.env.PORT
db().then(()=>{
console.log('dataBase is connected')
}).catch(()=>
{
    console.log('data base Error')
})
app.use('/user',userRouter)
app.use('/music',musicRouter)
app.use('/auth',authRouter)

app.listen(PORT,()=>
{
    console.log(`server Listing At Port ${PORT}`)
})