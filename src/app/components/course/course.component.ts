import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CoursService } from 'src/app/service/cours.service';
import { VacatairesService } from 'src/app/service/vacataires.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  public cours: any[] = [];
  public vacataires: any[] = [];

  editCoursForm = this.fb.group({
    _id: [''],
    name: ['', Validators.required],
    color: ['', [Validators.required, this.noSpaceAllowed]],
    group: ['', [Validators.required, this.noSpaceAllowed]],
  })

  constructor(private coursService: CoursService, private vacatairesService: VacatairesService, private fb: FormBuilder) {}

  ngOnInit() {
    this.coursService.getCours().subscribe((data: any) => {
      this.cours = data;                     
    }); 
    
    this.vacatairesService.getVacataire().subscribe((data: any) => {
      this.vacataires = data;                     
    }); 

  }

  initializeFormWithId(id: string) {
    console.log(this.cours);
    
    const cours = this.cours.find(cours => cours._id === id);
    
    if (cours) {
      this.editCoursForm.patchValue({
        _id: cours._id,
        name: cours.name,
        color: cours.color,
        group: cours.group,
      });
    }
  }

  /**
   * Accède aux contrôles du formulaire.
   * Notez que cette méthode retourne un objet, où chaque clé est le nom d'un contrôle et la valeur est le contrôle lui-même.
   */
  get f() { return this.editCoursForm.controls }

  /**
   * Permet de retourner les valeurs des champs du formulaire
   * @returns
  */
  getId(): string { return this.editCoursForm.value._id || '' }
  getName(): string { return this.editCoursForm.value.name || '' }
  getColor(): string { return this.editCoursForm.value.color || '' }
  getGroup(): string { return this.editCoursForm.value.group || '' }

  /**
   * Validators personnalisé qui vérifie si la valeur du contrôle a des espaces
   * pour garantir que le champs du formulaire n'accepte pas de valeurs avec espaces.
   * @param control : Contrôle abstract
   * @returns
  */
  noSpaceAllowed(control: AbstractControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { noSpaceAllowed: true }
    }

    return null;
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

  onSubmit() {
    const userConfirmed = window.confirm("Êtes-vous sûr de vouloir modifier les informations de ce cours ?");
    if (userConfirmed) {
      // this.editVacataire(this.form._id, this.form.name, this.form.lastName, this.form.phone, this.form.email, this.form.github)
      this.coursService.editCours(this.getId(), this.getName(), this.getColor(), this.getGroup()).subscribe({
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
  
  deleteCours(id: string) {
    const userConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce cours ?");
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
}
