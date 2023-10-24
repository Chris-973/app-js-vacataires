import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CoursService } from 'src/app/service/cours.service';
import { VacatairesService } from 'src/app/service/vacataires.service';

@Component({
  selector: 'app-vacataire',
  templateUrl: './vacataire.component.html',
  styleUrls: ['./vacataire.component.css']
})
export class VacataireComponent {
  public vacataires: any[] = []
  public cours: any[] = []

  editVacataireForm = this.fb.group({
    _id: [''],
    firstName: ['', [Validators.required, this.noSpaceAllowed]],
    lastName: ['', [Validators.required, this.noSpaceAllowed]],
    phone: ['', [Validators.required, Validators.pattern('[0-9 ]+'), this.noSpaceAllowed]],
    email: ['', [Validators.required, this.noSpaceAllowed]],
    github: ['', [Validators.required, this.noSpaceAllowed]],
  })

  constructor(private vacatairesService: VacatairesService, private coursService: CoursService, private fb: FormBuilder) {}

  ngOnInit() {
    this.vacatairesService.getVacataire().subscribe((data: any) => {
      this.vacataires = data;                     
    });  
    
    this.coursService.getCours().subscribe((data: any) => {
      this.cours = data;                     
    });  
  }

  click() {
    console.log(this.vacataires);
    
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
        firstName: vacataire.firstName,
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
      this.vacatairesService.editVacataire(this.getId(), this.getFirstName(), this.getLastName(), this.getPhone(), this.getEmail(), this.getGithub()).subscribe({
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
      this.vacatairesService.deleteVacataire(id).subscribe({
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

  affecteVacataire(idCours: String, indexVacataire: number) {
    // console.log(`
    //   Voulez vous affecter au cours : ${idCours} ce vacataire : \n
    //   { ${this.vacataires[indexVacataire]._id} }
    // `);


    // this.vacatairesService.affecteVacataire(idCours, this.vacataires[indexVacataire].firstName, this.vacataires[indexVacataire].lastName, this.vacataires[indexVacataire].phone, this.vacataires[indexVacataire].email, this.vacataires[indexVacataire].github).subscribe({
    //   next: (response) => {
    //     // Traitement du succès
    //     console.log(response);
    //     // window.location.reload();
    //   },
    //   error: (error) => {
    //     // Gestion des erreurs
    //     console.error(error);
    //   }
    // });

    const userConfirmed = window.confirm("Êtes-vous sûr de vouloir affecter ce vacataire au cours ?");
    if (userConfirmed) {
      // this.editVacataire(this.form._id, this.form.name, this.form.lastName, this.form.phone, this.form.email, this.form.github)
      this.vacatairesService.affecteVacataire(idCours, 'chris', 'marie-angelique', '0648618251', 'chris@gmail.com', 'github//chris973').subscribe({
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
  
}
