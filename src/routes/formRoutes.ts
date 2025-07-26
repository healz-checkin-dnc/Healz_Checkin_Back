import { Router } from 'express';
import { handleFormSubmit } from '../controllers/formController.js';

const router = Router();

router.post('/send-form', handleFormSubmit);

export default router;
