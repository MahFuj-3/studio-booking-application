import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudioService {
  private studiosUrl =
    'https://gist.githubusercontent.com/rash3dul-islam/88e1565bea2dd1ff9180ff733617a565/raw/684afa147a8e726d7a5e4fdeb390f2d48b35051d/studio-mock-api,json';

  constructor(private http: HttpClient) {}

  getStudios(): Observable<any> {
    return this.http.get(this.studiosUrl);
  }
}
