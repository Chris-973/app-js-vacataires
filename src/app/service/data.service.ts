import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl  = 'http://localhost:3000/vacataires';

  constructor(private http: HttpClient) { }

  getVacataire() {
    return this.http.get(this.apiUrl)    
  }

  addVacataire(name: string, lastName: string, phone: string, email: string, github: string): Observable<any> {
    const url = this.apiUrl + "/newVacataire";
    return this.http.post(url, {name, lastName, phone, email, github});   
  }

  deleteVacataire(id: string): Observable<any> {
    const url = this.apiUrl + '/deleteVacataire/' + id;
    return this.http.delete(url);   
  }
}
