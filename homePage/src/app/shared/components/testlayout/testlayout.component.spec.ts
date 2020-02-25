import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestlayoutComponent } from './testlayout.component';

describe('TestlayoutComponent', () => {
  let component: TestlayoutComponent;
  let fixture: ComponentFixture<TestlayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestlayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
