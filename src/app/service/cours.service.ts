import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private apiUrl  = 'http://localhost:3000/cours';
  // private apiUrl  = 'https://ap-js-vacataires-api.vercel.app/cours';

  constructor(private http: HttpClient) { }

  getCours() {
    return this.http.get(this.apiUrl)    
  }

  addCours(name: string, color: string, group: string) {
    const url = this.apiUrl + "/addCours";
    return this.http.post(url, {name, color, group})
  }

  deleteCours(id: string): Observable<any> {
    const url = this.apiUrl + '/deleteCours/' + id;
    return this.http.delete(url);   
  }
}
