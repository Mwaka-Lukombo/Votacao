import mongoose from 'mongoose';




const VotacaoSchema = new mongoose.Schema({

    nameVotacao: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    dataInicio: {
        type: Date,
        required: true
    },

    dataFim: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ["agendada", "ativa", "encerrada"],
        default: "agendada"
    }

}, {
    timestamps: true
});



const Votacao = mongoose.model("Votacao", VotacaoSchema);

export default Votacao;









