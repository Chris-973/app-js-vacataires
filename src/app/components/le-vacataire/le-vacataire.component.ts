import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/vacataires.service';

@Component({
  selector: 'app-vacataire',
  templateUrl: './le-vacataire.component.html',
  styleUrls: ['./le-vacataire.component.css']
})
export class VacataireComponent {
  public vacataires: any[] = []

  editVacataireForm = this.fb.group({
    _id: [''],
    firstName: ['', [Validators.required, this.noSpaceAllowed]],
    lastName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    email: ['', Validators.required],
    github: ['', [Validators.required]],
  })

  constructor(private dataService: DataService, private fb: FormBuilder) {}

  ngOnInit() {
    this.dataService.getVacataire().subscribe((data: any) => {
      this.vacataires = data;                     
    });        
  }

  /**
   * permet de déterminer le style de la div status selon le status du vacataire
   * 
   * @param status : le status du vacataire
   * @returns : le style de la div status du vacataire
   */
  getVacataireStatusClass(status: string): string {
    switch (status) {
      case 'en attente':
        return 'status-gray';
      case 'admis':
        return 'status-green';
      default:
        return 'status-red';
    }
  }

  initializeFormWithId(id: string) {
    const vacataire = this.vacataires.find(vacataire => vacataire._id === id);
    
    if (vacataire) {
      this.editVacataireForm.patchValue({
        _id: vacataire._id,
        firstName: vacataire.name,
        lastName: vacataire.lastName,
        phone: vacataire.phone,
        email: vacataire.email,
        github: vacataire.github,
      });
    }
  }

  /**
   * Accède aux contrôles du formulaire.
   * Notez que cette méthode retourne un objet, où chaque clé est le nom d'un contrôle et la valeur est le contrôle lui-même.
   */
  get f() { return this.editVacataireForm.controls }

  /**
   * Permet de retourner les valeurs des champs du formulaire
   * @returns
  */
  getId(): string { return this.editVacataireForm.value._id || '' }
  getFirstName(): string { return this.editVacataireForm.value.firstName || '' }
  getLastName(): string { return this.editVacataireForm.value.lastName || '' }
  getPhone(): string { return this.editVacataireForm.value.phone || '' }
  getEmail(): string { return this.editVacataireForm.value.email || '' }
  getGithub(): string { return this.editVacataireForm.value.github || '' }

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

  onSubmit() {
    const userConfirmed = window.confirm("Êtes-vous sûr de vouloir modifier les informations de ce vacataire ?");
    if (userConfirmed) {
      // this.editVacataire(this.form._id, this.form.name, this.form.lastName, this.form.phone, this.form.email, this.form.github)
      this.dataService.editVacataire(this.getId(), this.getFirstName(), this.getLastName(), this.getPhone(), this.getEmail(), this.getGithub()).subscribe({
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

  deleteVacataire(id: string) {
    const userConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce vacataire ?");
    if (userConfirmed) {
      this.dataService.deleteVacataire(id).subscribe({
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
