import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { Toast, ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BookingService } from '../../../core/services/booking/booking.service';
import { DataHelperService } from '../../services/helpers/data-helper.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormatLocationPipe } from '../../pipes/format-location.pipe';

@Component({
  selector: 'app-booking-modal',
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    DatePickerModule,
    SelectModule,
    ToastModule,
    Toast,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './booking-modal.component.html',
  styleUrl: './booking-modal.component.scss',
  providers: [MessageService, FormatLocationPipe],
})
export class BookingModalComponent {
  @Input() studio: any; // Selected studio
  @Output() bookingConfirmed = new EventEmitter<any>();

  displayDialog: boolean = false; // Controls dialog visibility
  bookingDate: Date | null = null; // Selected date
  selectedTimeSlot: string | null = null; // Selected time slot
  userName: string = ''; // User's name
  userEmail: string = ''; // User's email
  errorMessage: string = ''; // Error message for unavailable slots

  minDate: Date = new Date(); // Minimum date (today)
  maxDate: Date = new Date(new Date().setMonth(this.minDate.getMonth() + 1)); // Maximum date (1 month from today)

  availableTimeSlots: string[] = []; // Available time slots

  constructor(
    private messageService: MessageService,
    private bookingService: BookingService,
    private dataHelperService: DataHelperService,
    public formatLocationPipe: FormatLocationPipe,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.dataHelperService.data$.subscribe((data) => {
      this.studio = data; // Update the received data
      console.log('Studio:', this.studio);
      this.generateTimeSlots();
    });
  }

  // Open the dialog
  openDialog() {
    this.displayDialog = true;
  }

  onDialogShow() {
    // Prevent auto-focus by blurring the focused element
    setTimeout(() => {
      const focusedElement = document.activeElement as HTMLElement;
      if (focusedElement) {
        focusedElement.blur(); // Remove focus
      }
    });
  }

  // Close the dialog
  onDialogHide() {
    this.resetForm();
  }

  // Reset the form
  resetForm() {
    this.bookingDate = null;
    this.selectedTimeSlot = null;
    this.userName = '';
    this.userEmail = '';
    this.errorMessage = '';
  }

  // Generate time slots based on studio availability
  generateTimeSlots() {
    const startTime = this.studio.Availability.Open;
    const endTime = this.studio.Availability.Close;
    const slots: any = [];

    let currentTime = startTime;
    while (currentTime < endTime) {
      slots.push(currentTime);
      currentTime = this.add30Minutes(currentTime);
    }

    this.availableTimeSlots = slots;
  }

  // Add 30 minutes to a time string
  add30Minutes(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes + 30, 0);
    let newSlot = `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    return newSlot;
  }

  // Handle form submission
  onSubmit() {
    if (
      !this.bookingDate ||
      !this.selectedTimeSlot ||
      !this.userName ||
      !this.userEmail
    ) {
      this.errorMessage = 'Please fill out all fields.';
      return;
    }

    // Check if the selected time slot is available
    const isAvailable = this.checkAvailability();
    if (!isAvailable) {
      this.errorMessage =
        'The selected time slot is not available. Please choose another time.';
      return;
    }

    // Save booking using the BookingService
    const booking = {
      studioId: this.studio.Id,
      studioName: this.studio.Name,
      studioType: this.studio.Type,
      location: this.formatLocationPipe.transform(this.studio.Location),
      date: this.bookingDate,
      timeSlot: this.selectedTimeSlot,
      userName: this.userName,
      userEmail: this.userEmail,
    };
    this.bookingService.saveBooking(booking);

    // Emit booking confirmation
    // this.bookingConfirmed.emit(booking);
    this.ref.close(booking);

    // Close the dialog
    // this.displayDialog = false;
  }

  // Check if the selected time slot is available
  checkAvailability(): boolean {
    const bookings = this.bookingService.getBookings();
    const isBooked = bookings.some(
      (booking) =>
        booking.studioId === this.studio.Id &&
        this.isSameDate(
          new Date(booking.date),
          new Date(this.bookingDate as any)
        ) &&
        booking.timeSlot === this.selectedTimeSlot
    );
    console.log(this.bookingDate);
    return !isBooked;
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  closeModal() {
    this.ref.close(); // Close the modal without passing data
  }
}
