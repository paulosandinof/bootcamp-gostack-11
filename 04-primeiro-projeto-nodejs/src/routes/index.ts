import { Router } from 'express';

import appointmentsRouter from './appointment.routes';

const router = Router();

router.use('/appointments', appointmentsRouter);

export default router;
