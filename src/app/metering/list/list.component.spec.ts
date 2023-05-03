import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteringListComponent } from './list.component';

describe('MeteringListComponent', () => {
  let component: MeteringListComponent;
  let fixture: ComponentFixture<MeteringListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeteringListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
