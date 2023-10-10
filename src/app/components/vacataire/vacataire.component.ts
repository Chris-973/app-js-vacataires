import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-vacataire',
  templateUrl: './vacataire.component.html',
  styleUrls: ['./vacataire.component.css']
})
export class VacataireComponent {
  
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

  initializeFormWithId(id: string) {
    const vacataire = this.vacataires.find(vacataire => vacataire._id === id);

    if (vacataire) {
      this.form._id = vacataire._id;
      this.form.name = vacataire.name;
      this.form.lastName = vacataire.lastName;
      this.form.phone = vacataire.phone;
      this.form.email = vacataire.email;
      this.form.github = vacataire.github;
    }
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

  onSubmit(isEdit: boolean, name: string, lastName: string, phone: string, email: string, github: string) {
    if(!isEdit) {
      this.addVacataire(name, lastName, phone, email, github)
    } else {
    
      this.editVacataire(this.form._id, this.form.name, this.form.lastName, this.form.phone, this.form.email, this.form.github)
    }
  }

  deleteVacataire(id: string) {
    this.dataService.deleteVacataire(id).subscribe({
      next: (response) => {
        // Traitement du succès
        console.log(response);
      },
      error: (error) => {
        // Gestion des erreurs
        console.error(error);
      },
      complete: () => {
        window.location.reload()
      }
    });    
  }
  
  editVacataire(id: String, name: string, lastName: string, phone: string, email: string, github: string) {
    console.log(name);
    
    this.dataService.editVacataire(id, name, lastName, phone, email, github).subscribe({
      next: (response) => {
        // Traitement du succès
        console.log(response);
      },
      error: (error) => {
        // Gestion des erreurs
        console.error(error);
      },
      complete: () => {
        window.location.reload()
      }
    });    
    
  }

}
