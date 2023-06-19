import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsTestComponent } from './statistics-test.component';

describe('StatisticsTestComponent', () => {
  let component: StatisticsTestComponent;
  let fixture: ComponentFixture<StatisticsTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
