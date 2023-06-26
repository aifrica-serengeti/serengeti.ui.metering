import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsDetailTableComponent } from './statistics-detail-table.component';

describe('StatisticsDetailTableComponent', () => {
  let component: StatisticsDetailTableComponent;
  let fixture: ComponentFixture<StatisticsDetailTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsDetailTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
