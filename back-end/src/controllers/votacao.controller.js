import mongoose from "mongoose";
import Votacao from "../models/votacao.model.js";


import dayjs from 'dayjs';
import 'dayjs/locale/pt-br.js';


import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import { verifyTime } from "../lib/validadeDate.js";


dayjs.extend(utc);
dayjs.extend(timezone);


dayjs.tz.setDefault("Africa/Maputo");

// dayjs.utc().isUTC(); 
// dayjs.utc().local().format();
dayjs.extend(customParseFormat);


export const createVotacao = async (req, res) => {
    const {
        nameVotacao,
        description,
        dataInicio,
        dataFim,
        horaInicio,
        horaFim
    } = req.body;

    try {

        // 1. Validação dos campos obrigatórios
        if (!nameVotacao) {
            return res.status(400).json({
                message: "Coloque o nome da votação"
            });
        }

        if (!description) {
            return res.status(400).json({
                message: "Coloque a descrição da votação"
            });
        }

        if (!dataInicio || !dataFim) {
            return res.status(400).json({
                message: "Coloque as datas da votação"
            });
        }

        if (!horaInicio || !horaFim) {
            return res.status(400).json({
                message: "Coloque as horas da votação"
            });
        }

        // 2. Validar as datas
        const inicio = dayjs(dataInicio, "YYYY-MM-DD", true);
        const fim = dayjs(dataFim, "YYYY-MM-DD", true);

        if (!inicio.isValid() || !fim.isValid()) {
            return res.status(400).json({
                message: "Data inválida. Use o formato YYYY-MM-DD"
            });
        }

        // 3. Verificar se a data final é anterior à inicial
        if (fim.isBefore(inicio, "day")) {
            return res.status(400).json({
                message: "A data final não pode ser anterior à data inicial"
            });
        }

        // 4. Verificar se a data inicial já passou
        const hoje = dayjs().startOf("day");

        if (inicio.isBefore(hoje, "day")) {
            return res.status(400).json({
                message: "A data de início não pode estar no passado"
            });
        }

         const {
            isValid,
            message
        } = verifyTime(horaInicio, horaFim);

        if (!isValid) {
            return res.status(400).json({
                message
            });
        }

        if(!isValid){
            return res.status(400).json({
                message:message
            })
        }

        // 5. Verificar se a votação já existe
        const votacaoExists = await Votacao.findOne({
            nameVotacao
        });

        if (votacaoExists) {
            return res.status(400).json({
                message: "Essa votação já existe"
            });
        }

        // 6. Criar votação
        const newVotacao = new Votacao({
            nameVotacao,
            description,
            dataInicio: inicio.toDate(),
            dataFim: fim.toDate(),
            horaInicio,
            horaFim
        });

        await newVotacao.save();

        return res.status(201).json({
            message: "Votação criada com sucesso",
            newVotacao
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


export const getVotacoes = async(req,res)=>{
    try {
        
        const votacoes = await Votacao.find();

        res.status(200).json(votacoes);
    } catch (error) {
        res.status(500).json({
            message:"internal Server Error",
            error:message.error
        })
    }
}

export const getSingleVotacao = async(req,res)=>{
    const {
        id
    } = req.params;
    
    try {
        
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({
                message:"Invalid ObjectId"
            })
        }

        const votacao = await Votacao.findById(id);

        if(!votacao){
            return res.status(404).json({
                message:"A votacao nao existe"
            })
        }

        return res.status(200).json(votacao)
        
    } catch (error) {
        res.status(500).json({
            message:'Internal Server Error',
            error:error.message
        })
    }
}

export const updateVotacao = async (req, res) => {
    const { id } = req.params;

    const {
        nameVotacao,
        description,
        dataInicio,
        dataFim,
        horaInicio,
        horaFim
    } = req.body;

    try {

        // 1. Validar ObjectId
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid ObjectId"
            });
        }

        // 2. Procurar a votação
        const votacao = await Votacao.findById(id);

        if (!votacao) {
            return res.status(404).json({
                message: "A votação não existe"
            });
        }

        // 3. Validar campos obrigatórios
        if (!nameVotacao) {
            return res.status(400).json({
                message: "Coloque o nome da votação"
            });
        }

        if (!description) {
            return res.status(400).json({
                message: "Coloque a descrição da votação"
            });
        }

        if (!dataInicio || !dataFim) {
            return res.status(400).json({
                message: "Coloque as datas da votação"
            });
        }

        if (!horaInicio || !horaFim) {
            return res.status(400).json({
                message: "Coloque as horas da votação"
            });
        }

        // 4. Validar formato das datas
        const inicio = dayjs(
            dataInicio,
            "YYYY-MM-DD",
            true
        );

        const fim = dayjs(
            dataFim,
            "YYYY-MM-DD",
            true
        );

        if (!inicio.isValid() || !fim.isValid()) {
            return res.status(400).json({
                message: "Data inválida. Use o formato YYYY-MM-DD"
            });
        }

        // 5. Data final não pode ser anterior à inicial
        if (fim.isBefore(inicio, "day")) {
            return res.status(400).json({
                message: "A data final não pode ser anterior à data inicial"
            });
        }

        // 6. Data inicial não pode estar no passado
        const hoje = dayjs().startOf("day");

        if (inicio.isBefore(hoje, "day")) {
            return res.status(400).json({
                message: "A data de início não pode estar no passado"
            });
        }

        // 7. Validar horários
        const {
            isValid,
            message
        } = verifyTime(horaInicio, horaFim);

        if (!isValid) {
            return res.status(400).json({
                message
            });
        }

        // 8. Verificar se existe outra votação com o mesmo nome
        const votacaoExists = await Votacao.findOne({
            nameVotacao,
            _id: { $ne: id }
        });

        if (votacaoExists) {
            return res.status(400).json({
                message: "Já existe outra votação com esse nome"
            });
        }

        // 9. Atualizar
        votacao.nameVotacao = nameVotacao;
        votacao.description = description;
        votacao.dataInicio = inicio.toDate();
        votacao.dataFim = fim.toDate();
        votacao.horaInicio = horaInicio;
        votacao.horaFim = horaFim;

        await votacao.save();

        // 10. Resposta
        return res.status(200).json({
            message: "Votação atualizada com sucesso",
            votacao
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export const deleteVotacao = async(req,res)=>{
    
    const {
        id:votacaoId
    } = req.params;

    try {

        if(!mongoose.isValidObjectId(votacaoId)){
            return res.status(400).json({
                message:"Invalid object Id"
            })
        }


        const votacao = await Votacao.findByIdAndDelete(votacaoId);

        if(!votacao){
            return res.status(400).json({
                message:"Votacao deletada com sucesso"
            })
        }

        return res.status(200).json({
            message:"Votacao deletada com sucesso"
        })
        
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}










