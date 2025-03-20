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
    AutoCompleteModule,
    AutoComplete,
    RouterModule,
    FormatLocationPipe,
  ],
  templateUrl: './studio-list.component.html',
  styleUrl: './studio-list.component.scss',
})
export class StudioListComponent {
  studios: any[] = [];
  isLoading: boolean = true;

  filteredStudios: string[] = [];
  filteredLocations: string[] = [];
  selectedLocation: any;

  constructor(private studioService: StudioService) {}

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
}
