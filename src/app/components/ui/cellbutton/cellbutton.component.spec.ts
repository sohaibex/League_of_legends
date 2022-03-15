import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellbuttonComponent } from './cellbutton.component';

describe('CellbuttonComponent', () => {
  let component: CellbuttonComponent;
  let fixture: ComponentFixture<CellbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellbuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
