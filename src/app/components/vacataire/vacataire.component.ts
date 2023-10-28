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
  public vacatairesTmp: any[] = []

  public cours: any[] = []
  public coursTmp: any[] = []

  public filtreCoursError: boolean = false;
  public filtreStatusError: boolean = false;

  vacataireForm = this.fb.group({
    _id: [''],
    firstName: ['', [Validators.required, this.noSpaceAllowed]],
    lastName: ['', [Validators.required, this.noSpaceAllowed]],
    phone: ['', [Validators.required, Validators.pattern('[0-9 ]+'), this.noSpaceAllowed]],
    email: ['', [Validators.required, this.noSpaceAllowed]],
    github: ['', [Validators.required, this.noSpaceAllowed]],
    img: ['', Validators.required]
  })

  affecteVacataireForm = this.fb.group({
    name: ['']
  })

  

  constructor(private vacatairesService: VacatairesService, private coursService: CoursService, private fb: FormBuilder) {}

  ngOnInit() {
    this.vacatairesService.getVacataire().subscribe((data: any) => {
      this.vacataires = data;                     
      this.vacatairesTmp = data;                     
    });  
    
    this.coursService.getCours().subscribe((data: any) => {
      this.cours = data;                     
      this.coursTmp = data;                     
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
      case 'affecter':
        return 'status-green';
      case 'non affecter':
        return 'status-red';
      case 'en attente': {
        return 'status-gray';
      }
      default:
        return 'status-gray';
    }
  }

  initializeFormWithId(id: string) {
    const vacataire = this.vacataires.find(vacataire => vacataire._id === id);
    
    if (vacataire) {
      this.vacataireForm.patchValue({
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
  get f() { return this.vacataireForm.controls }

  /**
   * Permet de retourner les valeurs des champs du formulaire
   * @returns
  */
  getId(): string { return this.vacataireForm.value._id || '' }
  getFirstName(): string { return this.vacataireForm.value.firstName || '' }
  getLastName(): string { return this.vacataireForm.value.lastName || '' }
  getPhone(): string { return this.vacataireForm.value.phone || '' }
  getEmail(): string { return this.vacataireForm.value.email || '' }
  getGithub(): string { return this.vacataireForm.value.github || '' }

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

  filtreStatus(critere: String) {
    this.vacatairesTmp = this.vacataires.filter(vacataire => vacataire.status === critere);
    if(this.vacatairesTmp.length === 0) {
      this.filtreStatusError = true
    } else {
      this.filtreStatusError = false
    }
  }

  filtreCours(critere: String) {
    this.filtreStatusError = false // reset de la valeur du bool 

    this.coursTmp = this.cours.filter(cours => cours.name === critere);

    for (let index = 0; index < this.coursTmp.length; index++) {
      const cours = this.coursTmp[index];
      if(cours.vacataire) {
        this.vacatairesTmp = this.vacataires.filter(vacataire => vacataire._id === cours.vacataire._id);
        this.filtreCoursError = false
      } else {
        this.vacatairesTmp = [];        
        this.filtreCoursError = true
      }
    }    
  }

  addVacataire() {
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

  editVacataire() {
    const userConfirmed = window.confirm("Êtes-vous sûr de vouloir modifier les informations de ce vacataire ?");
    if (userConfirmed) {
      // console.log(this.getVacataireEmail);
      // console.log(this.getEmail);
      
      
      this.vacatairesService.editVacataire(this.getId(),
        this.getFirstName(), 
        this.getLastName(), 
        this.getPhone(), 
        this.getEmail(), 
        this.getGithub()).subscribe({
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

  deleteVacataire(idVacataire: string) {
    const userConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce vacataire ?");
    if (userConfirmed) {
      this.vacatairesService.deleteVacataire(idVacataire).subscribe({
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

  affecterVacataire(idCours: String, idVacataire: String) {

    const cours = this.cours.find(cours => cours._id === idCours);
    const vacataire = this.vacataires.find(vacataire => vacataire._id === idVacataire);

    const userConfirmed = window.confirm("Êtes-vous sûr de vouloir affecter ce vacataire au cours ?");
    if (userConfirmed) {

      if(!cours.vacataire) {
        this.vacatairesService.affecteVacataire(idCours, idVacataire, vacataire.firstName, vacataire.lastName, vacataire.phone, vacataire.email, vacataire.github).subscribe({
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

  desaffecterVacataire(index: number) {

    const userConfirmed = window.confirm("Êtes-vous sûr de vouloir désaffecter ce vacataire ?");
    if (userConfirmed) {
      const vacataire = this.vacataires[index]
    
      this.coursService.desaffecterVacataire(vacataire.cours._id).subscribe({
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

  hello(i: number) {
    console.log(this.vacataires[i].cours);
        
  }
  
}
