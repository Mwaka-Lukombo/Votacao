import { Router } from "express";
import { 
    createOpcoes,
    deleteOpcoes,
    getOpcoes,
    updateOpcoes
 } from "../controllers/opcoes.controller.js";




const router = Router();

router.get('/:id',getOpcoes);
router.post('/:id',createOpcoes);
router.post('/update/:id',updateOpcoes);
router.delete('/:id',deleteOpcoes);



export default router;



