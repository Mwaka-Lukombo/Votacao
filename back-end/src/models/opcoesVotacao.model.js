import mongoose from "mongoose";





const opcoesSchema = new mongoose.Schema({
    votacaoId:{
        type:mongoose.Schema.ObjectId,
        ref:"Votacao",
        required:[true,"Id da votacao is required"]
    },
    opcoes:[]
},{
    timestamps:true
})





const Opcoes = mongoose.model("Opcoes",opcoesSchema);



export default Opcoes;




