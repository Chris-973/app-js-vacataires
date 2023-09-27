import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-vacataire',
  templateUrl: './vacataire.component.html',
  styleUrls: ['./vacataire.component.css']
})
export class VacataireComponent {
  
  public vacataires: any[] = []

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getVacataire().subscribe((data: any) => {
      this.vacataires = data;               
    });
  }

  addVacataire(message: string, author: string) {

    this.dataService.addVacataire(message, author).subscribe({
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
}
