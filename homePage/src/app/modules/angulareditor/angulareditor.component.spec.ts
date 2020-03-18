import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngulareditorComponent } from './angulareditor.component';

describe('AngulareditorComponent', () => {
  let component: AngulareditorComponent;
  let fixture: ComponentFixture<AngulareditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngulareditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngulareditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
