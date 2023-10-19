import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  name = new FormControl('');

  constructor(private fb: FormBuilder) { }

  profileForm = this.fb.group({
    firstName: ['', [Validators.required, this.noSpaceAllowed]],
    lastName: ['', Validators.required],
    address: this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    }),
  });

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Chris',
      lastName: 'Marie-Angélique',
      address: {
        street: '123 Drew Street',
        city: 'Toulouse',
        state: 'France',
        zip: '1 Rue Vincent Van Gogh'
      }
    });
  }

  noSpaceAllowed(control: AbstractControl) {
    if(control.value != null && control.value.indexOf(' ') != -1) {
      return {noSpaceAllowed: true}
    }

    return null;
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}
