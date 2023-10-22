import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CoursService } from 'src/app/service/cours.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  public cours: any[] = []

  createCoursForm = this.fb.group({
    name: ['', [Validators.required]],
    color: ['', [Validators.required]],
    group: ['', [Validators.required, this.noSpaceAllowed]],
  })

  constructor(private dataService: CoursService, private fb: FormBuilder) {}

  ngOnInit() {
    this.dataService.getCours().subscribe((data: any) => {
      this.cours = data;               
    });
  }

  updateCours() {
    this.createCoursForm.patchValue({
      name: 'Base de données',
      color: '#e66465',
      group: 'BUT3-1',
    });
  }

  /**
   * Accède aux contrôles du formulaire.
   * Notez que cette méthode retourne un objet, où chaque clé est le nom d'un contrôle et la valeur est le contrôle lui-même.
   */
  get f() { return this.createCoursForm.controls }

  /**
   * Permet de retourner les valeurs des champs du formulaire
   * @returns
   */
  getName(): string { return this.createCoursForm.value.name || '' }
  getColor(): string { return this.createCoursForm.value.color || '' }
  getGroup(): string { return this.createCoursForm.value.group || '' }

  /**
   * Validators personnalisé qui vérifie si la valeur du contrôle a des espaces
   * pour garantir que le champs du formulaire n'accepte pas de valeurs avec espaces.
   * @param control : Contrôle abstract
   * @returns
   */
  noSpaceAllowed(control: AbstractControl) {
    if(control.value != null && control.value.indexOf(' ') != -1) {
      return {noSpaceAllowed: true}
    }

    return null;
  }

  /**
   * Délchenché lorsque le formulaire est soumis. 
   * Elle appel service de données des vacataires pour ajouter un nouveau vacataire avec les valeurs du formulaire
   */
  onSubmit() {
    // console.log(this.createCoursForm.value);
    this.dataService.addCours(this.getName(), this.getColor(), this.getGroup()).subscribe({
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
}
