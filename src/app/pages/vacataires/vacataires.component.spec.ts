import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacatairesComponent } from './vacataires.component';

describe('VacatairesComponent', () => {
  let component: VacatairesComponent;
  let fixture: ComponentFixture<VacatairesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacatairesComponent]
    });
    fixture = TestBed.createComponent(VacatairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
