import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private readonly storageKey = 'bookings';

  constructor() {}

  // Save a booking
  saveBooking(booking: any): void {
    const bookings = this.getBookings();
    bookings.push(booking);
    localStorage.setItem(this.storageKey, JSON.stringify(bookings));
  }

  // Get all bookings
  getBookings(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  // Clear all bookings (optional)
  clearBookings(): void {
    localStorage.removeItem(this.storageKey);
  }
}
