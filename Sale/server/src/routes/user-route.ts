import { Router } from 'express';
import { login } from '../controllers/user-controller';



const router = Router();

router.post('/login', login);
// router.post('/register', getUserByLoginID);

export default router;