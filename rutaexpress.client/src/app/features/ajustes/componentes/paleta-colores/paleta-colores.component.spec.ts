import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletaColoresComponent } from './paleta-colores.component';

describe('PaletaColoresComponent', () => {
  let component: PaletaColoresComponent;
  let fixture: ComponentFixture<PaletaColoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaletaColoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaletaColoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
