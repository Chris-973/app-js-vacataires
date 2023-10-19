import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/vacataires.service';

@Component({
  selector: 'app-vacataires',
  templateUrl: './vacataires.component.html',
  styleUrls: ['./vacataires.component.css']
})
export class VacatairesComponent {
  public vacataires: any[] = []

  createVacataireForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', Validators.required],
    phone: ['', [Validators.required]],
    email: ['', Validators.required],
    github: ['', [Validators.required]],
  })

  form: any = {
    name: "",
    lastName: "",
    phone: "",
    email: "", 
    github: ""
  }

  constructor(private dataService: DataService, private fb: FormBuilder) {}

  ngOnInit() {
    this.dataService.getVacataire().subscribe((data: any) => {
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

  get firstName() {
    return this.createVacataireForm.get('firstName')
  }

  getFirstName(): string {
    return this.createVacataireForm.value.firstName || ''
  }
  getLastName(): string {
    return this.createVacataireForm.value.lastName || ''
  }
  getPhone(): string {
    return this.createVacataireForm.value.phone || ''
  }
  getEmail(): string {
    return this.createVacataireForm.value.email || ''
  }
  getGithub(): string {
    return this.createVacataireForm.value.github || ''
  }

  onSubmit() {
    this.dataService.addVacataire(this.getFirstName(), this.getLastName(), this.getPhone(), this.getEmail(), this.getGithub()).subscribe({
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
  

  /*
  onSubmit(name: string, lastName: string, phone: string, email: string, github: string) {
      // this.addVacataire(name, lastName, phone, email, github)

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
  */
}
