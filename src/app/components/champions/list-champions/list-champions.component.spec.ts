import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChampionsComponent } from './list-champions.component';

describe('ListChampionsComponent', () => {
  let component: ListChampionsComponent;
  let fixture: ComponentFixture<ListChampionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChampionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChampionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
