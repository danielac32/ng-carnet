import { Injectable ,inject} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development'
import {StateResponse} from '../../interface/state.interface'
@Injectable({
  providedIn: 'root'
})
export class StateService {
 private baseUrl = environment.apiUrl;//'http://localhost:4000';
 private httpClient=inject(HttpClient);

 findAll() {
    const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.httpClient.get<StateResponse>(`${ this.baseUrl }/state/`,{ headers });
      }
      return new Observable<StateResponse>();
 }
}
