import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudioService } from '../../../../core/services/studio/studio.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { FormatLocationPipe } from '../../../../shared/pipes/format-location.pipe';
import { Toast, ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-studio-list',
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    RatingModule,
    FormsModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    InputNumberModule,
    AutoCompleteModule,
    AutoComplete,
    RouterModule,
    FormatLocationPipe,
    ToastModule,
    Toast,
  ],
  templateUrl: './studio-list.component.html',
  styleUrl: './studio-list.component.scss',
  providers: [MessageService],
})
export class StudioListComponent {
  studios: any[] = [];
  isLoading: boolean = true;

  filteredStudios: string[] = [];
  filteredLocations: string[] = [];
  selectedLocation: any;
  studioDistance: any = null;

  constructor(
    private studioService: StudioService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getStudiosData();
  }

  getStudiosData() {
    this.isLoading = true;
    this.studioService.getStudios().subscribe((data) => {
      this.studios = data.Studios;
      this.filteredStudios = data.Studios;
      // console.log('Studios:', this.studios);
      this.isLoading = false;
    });
  }

  openBookingDialog(studio: any) {
    console.log('Booking studio:', studio);
  }

  filterLocation(event: AutoCompleteCompleteEvent) {
    console.log('Filtering locations:', event);
    const query = event.query.toLowerCase(); // Get the search query
    this.filteredLocations = this.studios
      .map((studio) => studio.Location)
      .filter((location) => {
        const locationString =
          `${location.Address}, ${location.Area}, ${location.City}`.toLowerCase();
        return locationString.includes(query); // Filter locations that match the query
      });

    this.filteredStudios = this.studios.filter((studio) => {
      const locationString =
        `${studio.Location.Address}, ${studio.Location.Area}, ${studio.Location.City}`.toLowerCase();
      return locationString.includes(query); // Filter studios whose location matches the query
    });
  }

  onLocationSelect(event: any) {
    console.log('Location selected:', event.value);

    // Find the matching studio
    const selectedLocation = event.value;
    const matchingStudio = this.findMatchingStudio(selectedLocation);

    if (matchingStudio) {
      console.log('Matching Studio:', matchingStudio);
      // Call your function here
      this.handleMatchingStudio(matchingStudio);
    } else {
      console.log('No matching studio found.');
      alert('No matching studio found for the selected location.');
    }
  }

  findMatchingStudio(selectedLocation: any): any {
    return this.studios.find((studio) => {
      const studioLocation = studio.Location;
      return (
        studioLocation.City === selectedLocation.City &&
        studioLocation.Area === selectedLocation.Area &&
        studioLocation.Address === selectedLocation.Address &&
        studioLocation.Coordinates.Latitude ===
          selectedLocation.Coordinates.Latitude &&
        studioLocation.Coordinates.Longitude ===
          selectedLocation.Coordinates.Longitude
      );
    });
  }

  handleMatchingStudio(studio: any) {
    // Your logic here
    this.filteredStudios = [studio];
  }

  getUserLocation(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }

  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  async searchStudiosByRadius() {
    try {
      // Get user's location
      const userLocation = await this.getUserLocation();

      // Filter studios within the radius
      this.filteredStudios = this.studios.filter((studio) => {
        const studioLat = studio.Location.Coordinates.Latitude;
        const studioLon = studio.Location.Coordinates.Longitude;
        const distance = this.calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          studioLat,
          studioLon
        );
        console.log('Distance:', distance);
        console.log('studioDistance:', this.studioDistance);
        return distance <= this.studioDistance;
      });

      // Handle no studios found
      if (this.filteredStudios.length === 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No studios found within the specified radius.',
        });
      }
    } catch (error: any) {
      // Handle errors
      if (error.code === error.PERMISSION_DENIED) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            'Location access was denied. Please enable location access to use this feature.',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while fetching your location.',
        });
      }
    }
  }

  resetFilters() {
    this.studioDistance = null;
    this.selectedLocation = null;
    this.filteredStudios = this.studios;
  }
}
