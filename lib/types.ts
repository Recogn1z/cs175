export interface Reservation {
  id: string;
  date: Date;
  time: string;
  username: string;
  service: string;
}

export interface User {
  username: string;
  password: string;
}