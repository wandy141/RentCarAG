import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculoConsultaComponent } from './vehiculo-consulta.component';

describe('VehiculoConsultaComponent', () => {
  let component: VehiculoConsultaComponent;
  let fixture: ComponentFixture<VehiculoConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculoConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
