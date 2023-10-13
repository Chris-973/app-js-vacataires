import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-vacataires',
  templateUrl: './vacataires.component.html',
  styleUrls: ['./vacataires.component.css']
})
export class VacatairesComponent {
  public vacataires: any[] = []

  form: any = {
    name: "",
    lastName: "",
    phone: "",
    email: "", 
    github: ""
  }

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getVacataire().subscribe((data: any) => {
      this.vacataires = data;               
    });
  }

  addVacataire(name: string, lastName: string, phone: string, email: string, github: string) {

    this.dataService.addVacataire(name, lastName, phone, email, github).subscribe({
      next: (response) => {
        window.location.reload()
      },
      error: (error) => {
        // Gestion des erreurs
        console.error(error);
      },
      complete: () => {
      }
    });
    
  }

  onSubmit(name: string, lastName: string, phone: string, email: string, github: string) {
      this.addVacataire(name, lastName, phone, email, github)
  }
}
