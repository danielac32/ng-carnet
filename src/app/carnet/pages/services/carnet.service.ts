import { Injectable ,inject} from '@angular/core';
import { Observable ,throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development'
import {Carnet,CarnetsResponse} from '../../interface/carnet.interface'

import { saveAs } from 'file-saver'; // Necesitarás instalar file-saver: npm install file-saver
 
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
  


  delete(id:string):Observable<any>{
     const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.httpClient.delete<any>(`${ this.baseUrl }/carnets/${id}`,{ headers });
      }
      return new Observable<any>();
  }



  getCarnets(status?: number, limit: number = 10, page: number = 1 ): Observable<CarnetsResponse> {
    const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });

          return this.httpClient.get<CarnetsResponse>
            (`${ this.baseUrl }/carnets/get?status=${status}&limit=${ limit }&page=${page}`,{ headers })
      }
      return new Observable<CarnetsResponse>();
  }



  getCarnetBlob(cedule: string): Observable<Blob> {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.httpClient.get(`${ this.baseUrl }/carnets/files/${cedule}`, { headers, responseType: 'blob' });
    }
    return throwError('No access token found');
  }
  
  getCarnetBlob2(cedule: string): Observable<Blob> {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.httpClient.get(`${ this.baseUrl }/carnets/files2/${cedule}`, { headers, responseType: 'blob' });
    }
    return throwError('No access token found');
  }


  downloadCarnet(cedule:string){
      const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });

          this.httpClient.get(`${ this.baseUrl }/carnets/files/${cedule}`, { headers, responseType: 'blob' }).subscribe((blob) => {
            saveAs(blob, `${cedule}.jpeg`); // Guarda el archivo con la extensión correcta
          }, error => {
            console.error('File download error:', error);
          });
      }
  } 
 

  downloadCarnet2(cedule:string){
      const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });

          this.httpClient.get(`${ this.baseUrl }/carnets/files2/${cedule}`, { headers, responseType: 'blob' }).subscribe((blob) => {
            saveAs(blob, `${cedule}.jpeg`); // Guarda el archivo con la extensión correcta
          }, error => {
            console.error('File download error:', error);
          });
      }
  } 
 

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
