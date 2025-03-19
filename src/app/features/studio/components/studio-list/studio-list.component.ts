import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudioService } from '../../../../core/services/studio/studio.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'app-studio-list',
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    RouterModule,
  ],
  templateUrl: './studio-list.component.html',
  styleUrl: './studio-list.component.scss',
})
export class StudioListComponent {
  studios: any[] = [];
  isLoading: boolean = true;

  constructor(private studioService: StudioService) {}

  ngOnInit(): void {
    this.getStudiosData();
  }

  getStudiosData() {
    this.isLoading = true;
    this.studioService.getStudios().subscribe((data) => {
      this.studios = data.Studios;
      this.isLoading = false;
    });
  }

  openBookingDialog(studio: any) {
    console.log('Booking studio:', studio);
  }
}
