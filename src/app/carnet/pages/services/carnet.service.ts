import { Injectable ,inject} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development'
import {Carnet} from '../../interface/carnet.interface'


@Injectable({
  providedIn: 'root'
})
export class CarnetService {
 private baseUrl = environment.apiUrl;//'http://localhost:4000';
 private httpClient=inject(HttpClient);


 
/*
create(newCarnet: Carnet, file: File): Observable<any> {
  const token = localStorage.getItem('accessToken');
  if (token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const formData = new FormData();
    formData.append('file', file);

    // Agregar las propiedades del objeto Carnet al FormData
    Object.keys(newCarnet).forEach(key => {
      const value = (newCarnet as any)[key];
      formData.append(key, value);
      
    });

    return this.httpClient.post<any>(`${this.baseUrl}/carnets/send`, formData, { headers });
  }
  return new Observable<any>();
}*/


  create(newCarnet: Carnet):Observable<any>{
      const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.httpClient.post<any>(`${ this.baseUrl }/carnets/`, {...newCarnet},{ headers });
      }
      return new Observable<any>();
  } 
 


 sendFile(file: File,cedule:string):Observable<any>{
      const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          const formData = new FormData();
          formData.append('file', file);
          return this.httpClient.post<any>(`${ this.baseUrl }/carnets/upload/${cedule}`, formData,{ headers });
      }
      return new Observable<any>();
  }
}
