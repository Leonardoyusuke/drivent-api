import { Router } from 'express';
import { getBooking, postBooking, putBooking } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const bookingRouter = Router();

bookingRouter.get('/', authenticateToken, getBooking);
bookingRouter.post('/', authenticateToken, postBooking);
bookingRouter.put('/:bookingId', authenticateToken, putBooking);

export { bookingRouter };
