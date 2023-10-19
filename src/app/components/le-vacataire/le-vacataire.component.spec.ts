import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacataireComponent } from './le-vacataire.component';

describe('VacataireComponent', () => {
  let component: VacataireComponent;
  let fixture: ComponentFixture<VacataireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacataireComponent]
    });
    fixture = TestBed.createComponent(VacataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
