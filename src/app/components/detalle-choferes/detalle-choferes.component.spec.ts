import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleChoferesComponent } from './detalle-choferes.component';

describe('DetalleChoferesComponent', () => {
  let component: DetalleChoferesComponent;
  let fixture: ComponentFixture<DetalleChoferesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleChoferesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleChoferesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
