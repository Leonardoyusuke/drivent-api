import httpStatus from 'http-status';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function getBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const booking = await bookingService.getBookingByUserId(userId);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    next(error);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { roomId } = req.body;
  try {
    const booking = await bookingService.postBooking(userId, roomId);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === 'ForbiddenError') return res.sendStatus(httpStatus.FORBIDDEN);
    next(error);
  }
}
export async function putBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { bookingId } = req.params;
  const { roomId } = req.body;
  try {
    const newBooking = await bookingService.putBooking(Number(bookingId), roomId);
    return res.status(httpStatus.OK).send(newBooking);
  } catch (error) {
    if (error.name === 'ForbiddenError') return res.sendStatus(httpStatus.FORBIDDEN);
    next(error);
  }
}
