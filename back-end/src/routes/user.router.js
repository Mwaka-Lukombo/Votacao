import {Router} from 'express';
import { 
     checkUser,
     createUser,
     deleteUser,
     getSingleUser,
     getUserByIdentify,
     getUsers,
     loginUser,
     logout,
     updateUser
} from '../controllers/user.controller.js';

import {
     protectedRoute
} from '../middlewares/protectedRoute.js';


const router = Router();

//Auth routes
router.post('/login',loginUser);
router.get('/check',protectedRoute,checkUser);
router.post('/logout',logout);

//User management
router.post('/',createUser);
router.get('/',getUsers);
router.get('/:id',getSingleUser);
router.get('/identify/:identify',getUserByIdentify);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);




export default router;




