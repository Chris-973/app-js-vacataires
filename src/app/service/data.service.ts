import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl  = 'https://ap-js-vacataires-api.vercel.app/vacataires';

  constructor(private http: HttpClient) { }

  getVacataire() {
    return this.http.get(this.apiUrl)    
  }

  addVacataire(message: string, author: string): Observable<any> {
    const url = this.apiUrl + "/newVacataire";
    return this.http.post(url, {message, author});   
  }

  deleteVacataire(id: string): Observable<any> {
    const url = this.apiUrl + '/deleteVacataire/' + id;
    return this.http.delete(url);   
  }
}
