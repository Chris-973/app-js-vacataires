import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class VacatairesService {

  private apiUrl  = 'http://localhost:3000/vacataires';
  // private apiUrl  = 'https://ap-js-vacataires-api.vercel.app/vacataires';

  constructor(private http: HttpClient) { }

  getVacataire() {
    return this.http.get(this.apiUrl)    
  }

  addVacataire(firstName: string, lastName: string, phone: string, email: string, github: string): Observable<any> {
    const url = this.apiUrl + "/addVacataire";
    return this.http.post(url, {firstName, lastName, phone, email, github});   
  }

  deleteVacataire(id: string): Observable<any> {
    const url = this.apiUrl + '/deleteVacataire/' + id;
    return this.http.delete(url);   
  }

  editVacataire(id: String, firstName: string, lastName: string, phone: string, email: string, github: string): Observable<any> {
    const url = this.apiUrl + '/editVacataire/' + id;
    const body = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      github: github
    }
    return this.http.put(url, body);   
  }

  affecteVacataire(idCours: String, idVacataire: String, firstName: string, lastName: string, phone: string, email: string, github: string) {
    // const url = this.apiUrl + '/affecteVacataire/' + idCours + '';
    const url = `${this.apiUrl}/affecteVacataire/${idCours}/${idVacataire}`
    const body = {
      _id: idVacataire,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      github: github
    }
    
    return this.http.put(url, body);   
  }
}
