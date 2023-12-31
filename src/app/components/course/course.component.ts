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
  public coursTmp: any[] = [];

  public vacataires: any[] = [];
  public vacatairesTmp: any[] = [];

  public filtreStatusError: boolean = false;

  coursForm = this.fb.group({
    _id: [''],
    name: ['', Validators.required],
    color: ['#845798', []],
    group: ['', [Validators.required, this.noSpaceAllowed]],
  })

  constructor(private coursService: CoursService, private vacatairesService: VacatairesService, private fb: FormBuilder) {}

  ngOnInit() {
    this.coursService.getCours().subscribe((data: any) => {
      this.cours = data;
      this.coursTmp = data;
    });

    this.vacatairesService.getVacataire().subscribe((data: any) => {
      this.vacataires = data;
      this.vacatairesTmp = data;
    });

  }

  initializeFormWithId(id: string) {
    const cours = this.cours.find(cours => cours._id === id);

    if (cours) {
      this.coursForm.patchValue({
        _id: cours._id,
        name: cours.name,
        color: cours.color,
        group: cours.group,
      });
    }
  }

  resetForm() {
    this.coursForm.reset()
  }

  /**
   * Accède aux contrôles du formulaire.
   * Notez que cette méthode retourne un objet, où chaque clé est le nom d'un contrôle et la valeur est le contrôle lui-même.
   */
  get f() { return this.coursForm.controls }

  /**
   * Permet de retourner les valeurs des champs du formulaire
   * @returns
  */
  getId(): string { return this.coursForm.value._id || '' }
  getName(): string { return this.coursForm.value.name || '' }
  getColor(): string { return this.coursForm.value.color || '' }
  getGroup(): string { return this.coursForm.value.group || '' }

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

  filtreStatus(statut: string) {
    if (statut === 'avec') {
      this.coursTmp = this.cours.filter(cours => cours.vacataire !== undefined);
    } else if (statut === 'sans') {
      this.coursTmp = this.cours.filter(cours => cours.vacataire === undefined);
    }

    if(this.coursTmp.length === 0) {
      this.filtreStatusError = true
    } else {
      this.filtreStatusError = false
    }
  }


  addCours() {
    // console.log(this.createCoursForm.value);
    this.coursService.addCours(this.getName(), this.getColor(), this.getGroup()).subscribe({
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

  editCours() {
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
