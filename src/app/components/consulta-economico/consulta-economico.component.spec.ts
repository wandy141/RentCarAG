import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEconomicoComponent } from './consulta-economico.component';

describe('ConsultaEconomicoComponent', () => {
  let component: ConsultaEconomicoComponent;
  let fixture: ComponentFixture<ConsultaEconomicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaEconomicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaEconomicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
