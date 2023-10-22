import { Component } from '@angular/core';
import { CoursService } from 'src/app/service/cours.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  public cours: any[] = [];

  constructor(private coursService: CoursService) {}

  ngOnInit() {
    this.coursService.getCours().subscribe((data: any) => {
      this.cours = data;                     
    });        

  }
  
  deleteCours(id: string) {
    const userConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce vacataire ?");
    if (userConfirmed) {
      this.coursService.deleteCours(id).subscribe({
        next: (response) => {
          // Traitement du succès
          console.log(response);
          window.location.reload();
        },
        error: (error) => {
          // Gestion des erreurs
          console.error(error);
        }
      });
    }   
  }

  abbreviateCourseName(name: string) {
    // Supprime les accents et caractères spéciaux, puis divise en mots
    const words = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z ]/g, "").split(" ");
  
    // Crée un tableau de mots abrégés en utilisant les initiales
    if(name.includes(' ')){
      const abbreviatedWords = words.map(word => {
        return word.charAt(0).toUpperCase();
      });
    
      // Rejoindre les mots abrégés pour former le nom abrégé
      const abbreviatedName = abbreviatedWords.join("");

      return abbreviatedName;
    }
    
    return name.substring(0, 4);
  }

  print(id: number) {
    console.log(this.cours[id].vacataire.name);
    
  }
}
