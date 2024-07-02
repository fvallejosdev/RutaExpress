import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerColoresComponent } from './ver-colores.component';

describe('VerColoresComponent', () => {
  let component: VerColoresComponent;
  let fixture: ComponentFixture<VerColoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerColoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerColoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
