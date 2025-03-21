import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Make the service available application-wide
})
export class DataHelperService {
  // Create a BehaviorSubject to hold the data
  private dataSubject = new BehaviorSubject<any>(null);

  // Expose the data as an observable
  data$ = this.dataSubject.asObservable();

  // Method to send data
  sendData(data: any) {
    this.dataSubject.next(data);
  }

  // Method to clear data
  clearData() {
    this.dataSubject.next(null);
  }
}
