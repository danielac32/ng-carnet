import { Injectable ,inject} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development'

@Injectable({
  providedIn: 'root'
})
export class CarnetService {
 private baseUrl = environment.apiUrl;//'http://localhost:4000';
 private httpClient=inject(HttpClient);


 create():Observable<any>{
    
    return new Observable<any>();
 }
 sendFile(file: File):Observable<any>{
      const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          const formData = new FormData();
          formData.append('file', file);
          return this.httpClient.post<any>(`${ this.baseUrl }/carnets/upload/`, formData,{ headers });
      }
      return new Observable<any>();
  }
}
