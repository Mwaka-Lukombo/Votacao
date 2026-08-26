import { Router } from "express";
import { 
    createVotacao, 
    deleteVotacao, 
    getSingleVotacao, 
    getVotacoes,
    updateVotacao
} from "../controllers/votacao.controller.js";



const router = Router();


router.get('/',getVotacoes);
router.post('/',createVotacao);
router.post('/:id',updateVotacao);
router.get('/:id',getSingleVotacao);
router.delete('/:id',deleteVotacao);


export default router;






