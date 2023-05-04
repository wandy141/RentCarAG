import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegitroComponent } from './regitro.component';

describe('RegitroComponent', () => {
  let component: RegitroComponent;
  let fixture: ComponentFixture<RegitroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegitroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegitroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
