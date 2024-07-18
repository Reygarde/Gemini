import express from 'express';
import { createUser, getUsers } from './controllers/userController.js'; // Exemple de contrôleurs

const router = express.Router();

router.post('/users', createUser);
router.get('/users', getUsers);

export default router;
