import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { BookingService } from '../../../../core/services/booking/booking.service';

@Component({
  selector: 'app-booking-list',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    RouterModule,
  ],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.scss',
})
export class BookingListComponent {
  bookings: any[] = []; // List of bookings

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  // Load bookings from the BookingService
  loadBookings() {
    this.bookings = this.bookingService.getBookings().map((booking: any) => ({
      userName: booking.userName,
      userEmail: booking.userEmail,
      studioName: booking.studioName,
      studioType: booking.studioType,
      location: booking.location,
      date: new Date(booking.date),
      timeSlot: booking.timeSlot,
    }));
  }
}
