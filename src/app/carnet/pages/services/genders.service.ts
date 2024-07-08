import { Injectable ,inject} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development'
import {GenderResponse} from '../../interface/genders.interface'
@Injectable({
  providedIn: 'root'
})
export class GendersService {
private baseUrl = environment.apiUrl;//'http://localhost:4000';
 private httpClient=inject(HttpClient);

 findAll() {
    const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.httpClient.get<GenderResponse>(`${ this.baseUrl }/genders/`,{ headers });
      }
      return new Observable<GenderResponse>();
 }
}
