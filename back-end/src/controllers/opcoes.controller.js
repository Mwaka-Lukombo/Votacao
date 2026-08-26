import mongoose from "mongoose";
import Opcoes from "../models/opcoesVotacao.model.js";
import Votacao from "../models/votacao.model.js";








export const createOpcoes = async(req,res)=>{

    const {
        id:votacaoId
    } = req.params;

    const {
        opcoes
    } = req.body;
    
    try {

        if(!mongoose.isValidObjectId(votacaoId)){
            return res.status(400).json({
                message:"Invalid ObjectId"
            })
        }

        const votacao = await Votacao.findById(votacaoId);
         const existOpcoes = await Opcoes.findOne({
            votacaoId:votacao?._id
         });

         const todasOpcoes = opcoes?.split(",");

        if(!votacao){
            return res.status(404).json({
                message:"Votacao not found!"
            })
        }

        if(existOpcoes){
            return res.status(400).json({
                message:"Essa votacao ja contem opcoes"
            })
        }

        if(!opcoes){
            return res.status(400).json({
                message:"Coloque as opcoes de votacao"
            })
        }

        const newOpcoes = new Opcoes({
            votacaoId:votacao._id,
            opcoes:todasOpcoes
        });

        await newOpcoes.save();

        return res.status(201).json({
            message:"Opcoes criadas com sucesso!",
            newOpcoes
        })
        
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

export const getOpcoes = async(req,res)=>{
    const {
        id:votacaoId
    } = req.params;


    try {
        
        if(!mongoose.isValidObjectId(votacaoId)){
            return res.status(400).json({
                message:"Invalid ObjectId"
            })
        }

         const OpcoesVotacao = await Opcoes.findOne({
            votacaoId:votacaoId
         });

         if(OpcoesVotacao?.length === 0){
            return res.status(400).json({
                message:"Something went wrong"
            })
         }

        return res.status(200).json(OpcoesVotacao);

    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

export const updateOpcoes = async (req, res) => {

    const { id: opcoesId } = req.params;
    const { opcoes } = req.body;

    try {

        // 1. Validar o ID
        if (!mongoose.isValidObjectId(opcoesId)) {
            return res.status(400).json({
                message: "Invalid ObjectId"
            });
        }

        // 2. Verificar se as opções existem
        const opcoesVotacao = await Opcoes.findById(opcoesId);

        if (!opcoesVotacao) {
            return res.status(404).json({
                message: "Opções da votação não encontradas"
            });
        }

        // 3. Verificar se foram enviadas opções
        if (!opcoes) {
            return res.status(400).json({
                message: "Coloque as opções de votação"
            });
        }

        // 4. Converter string em array
        const todasOpcoes = opcoes
            .split(",")
            .map(opcao => opcao.trim())
            .filter(opcao => opcao !== "");

        // 5. Verificar se existe pelo menos uma opção
        if (todasOpcoes.length === 0) {
            return res.status(400).json({
                message: "Adicione pelo menos uma opção"
            });
        }

        // 6. Atualizar
        opcoesVotacao.opcoes = todasOpcoes;

        await opcoesVotacao.save();

        // 7. Resposta
        return res.status(200).json({
            message: "Opções atualizadas com sucesso",
            opcoesVotacao
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export const deleteOpcoes = async(req,res)=>{
    const {
        id:votacaoId
    } = req.params;
    
    try {

        if(!mongoose.isValidObjectId(votacaoId)){
            return res.status(400).json({
                message:"Invalid ObjectId"
            })
        }

        const votacao = await Votacao.findByIdAndDelete(votacaoId);

        if(!votacao){
            return res.status(200).json({
                message:"Opcoes removidas"
            })
        }
        
        return res.status(200).json({
            message:"Opcoes removidas com sucesso"
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error?.message
        })
    }
}


