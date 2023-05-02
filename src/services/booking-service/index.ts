import { forbiddenError, notFoundError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getBookingByUserId(userId: number) {
  const booking = await bookingRepository.getBooking(userId);
  if (!booking) throw notFoundError();
  return { id: booking.id, Room: booking.Room };
}
async function postBooking(userId: number, roomId: number) {
  const ticketType = await ticketsRepository.verifyTicketType(userId);
  if (
    ticketType.status === 'RESERVED' ||
    ticketType.TicketType.isRemote === true ||
    ticketType.TicketType.includesHotel === false
  )
    throw forbiddenError();

  const room = await bookingRepository.checkRoom(roomId);
  if (!room) throw notFoundError();
  const roomCapacity = await bookingRepository.checkCapacity(roomId);
  if (roomCapacity >= room.capacity) throw forbiddenError();
  const booking = await bookingRepository.postBooking(userId, roomId);
  return { bookingId: booking.id };
}
async function putBooking(bookingId: number, roomId: number, userId: number) {
  const ticketType = await ticketsRepository.verifyTicketType(userId);
  if (
    ticketType.status === 'RESERVED' ||
    ticketType.TicketType.isRemote === true ||
    ticketType.TicketType.includesHotel === false
  )
    throw forbiddenError();

  const checkBooking = await bookingRepository.checkBooking(bookingId);
  if (!checkBooking) throw notFoundError();
  const room = await bookingRepository.checkRoom(roomId);
  if (!room) throw notFoundError();
  const roomCapacity = await bookingRepository.checkCapacity(roomId);
  if (roomCapacity >= room.capacity) throw forbiddenError();
  const booking = await bookingRepository.putBooking(bookingId, roomId);
  return { bookingId: booking.id };
}

export default {
  getBookingByUserId,
  postBooking,
  putBooking,
};
