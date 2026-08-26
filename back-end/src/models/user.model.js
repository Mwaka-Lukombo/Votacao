import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
 userIdentify:{
    type:Number,
    required:[true,"Coloque um identificar para o usuario"],
    unique:true
 },
 userName:{
    type:String,
    required:true,
    trim:true
 }
},{
    timestamps:true
})



const User = mongoose.model("User", userSchema);



export default User;

