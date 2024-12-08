import { Reservation } from "./types";

export const reservations = {
  create(reservation: Omit<Reservation, "id">): Reservation {
    const reservationsList = this.getAll();
    const newReservation = {
      ...reservation,
      id: Math.random().toString(36).substr(2, 9)
    };
    
    reservationsList.push(newReservation);
    localStorage.setItem('reservations', JSON.stringify(reservationsList));
    return newReservation;
  },

  getAll(): Reservation[] {
    const reservations = localStorage.getItem('reservations');
    return reservations ? JSON.parse(reservations) : [];
  },

  getUserReservations(username: string): Reservation[] {
    return this.getAll().filter(r => r.username === username);
  },

  cancel(id: string): boolean {
    const reservationsList = this.getAll();
    const index = reservationsList.findIndex(r => r.id === id);
    if (index === -1) return false;
    
    reservationsList.splice(index, 1);
    localStorage.setItem('reservations', JSON.stringify(reservationsList));
    return true;
  }
};