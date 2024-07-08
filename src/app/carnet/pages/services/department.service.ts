import { Injectable ,inject} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development'

import {DepartmentResponse} from '../../interface/department.interface'

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
 private baseUrl = environment.apiUrl;//'http://localhost:4000';
 private httpClient=inject(HttpClient);

 findAll() {
    const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.httpClient.get<DepartmentResponse>(`${ this.baseUrl }/department/`,{ headers });
      }
      return new Observable<DepartmentResponse>();
 }
}
