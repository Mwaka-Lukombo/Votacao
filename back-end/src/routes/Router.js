import { Router } from "express";
import eventRoute from '../routes/votacao.route.js';
import opcoesRoute from '../routes/opcoes.route.js';
import userRoute from '../routes/user.router.js';

const router = Router();



router.use('/event',eventRoute);
router.use('/opcoes',opcoesRoute);
router.use('/users',userRoute);


export default router;





