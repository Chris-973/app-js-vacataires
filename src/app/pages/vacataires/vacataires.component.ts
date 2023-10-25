import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { VacatairesService } from 'src/app/service/vacataires.service';

@Component({
  selector: 'app-vacataires',
  templateUrl: './vacataires.component.html',
  styleUrls: ['./vacataires.component.css']
})
export class VacatairesComponent {
  public vacataires: any[] = []
  public vacatairesTmp: any[] = []

  createVacataireForm = this.fb.group({
    firstName: ['', [Validators.required, this.noSpaceAllowed]],
    lastName: ['', [Validators.required, this.noSpaceAllowed]],
    phone: ['', [Validators.required, Validators.pattern('[0-9 ]+'), this.noSpaceAllowed]],
    email: ['', Validators.required],
    github: ['', [Validators.required, this.noSpaceAllowed]],
  })

  constructor(private vacatairesService: VacatairesService, private fb: FormBuilder) {}

  ngOnInit() {
    this.vacatairesService.getVacataire().subscribe((data: any) => {
      this.vacataires = data;               
    });
  }

  updateProfile() {
    this.createVacataireForm.patchValue({
      firstName: 'Chris',
      lastName: 'Marie-Angélique',
      phone: '0648618251',
      email: 'christopher@gmail.com',
      github: 'github//Christopher',
    });
  }

  /**
   * Accède aux contrôles du formulaire.
   * Notez que cette méthode retourne un objet, où chaque clé est le nom d'un contrôle et la valeur est le contrôle lui-même.
   */
  get f() { return this.createVacataireForm.controls }

  /**
   * Permet de retourner les valeurs des champs du formulaire
   * @returns
   */
  getFirstName(): string { return this.createVacataireForm.value.firstName || '' }
  getLastName(): string { return this.createVacataireForm.value.lastName || '' }
  getPhone(): string { return this.createVacataireForm.value.phone || '' }
  getEmail(): string { return this.createVacataireForm.value.email || '' }
  getGithub(): string { return this.createVacataireForm.value.github || '' }

  click() {
    console.log(this.getFirstName());
    
  }

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
    this.vacatairesService.addVacataire(this.getFirstName(), this.getLastName(), this.getPhone(), this.getEmail(), this.getGithub()).subscribe({
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

  filtreData(critere: String) {
    this.vacatairesTmp = this.vacataires.filter(vacataire => vacataire.status === critere);
  }
}
