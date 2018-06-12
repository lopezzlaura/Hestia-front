import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontDeclareComponent } from './front-declare.component';

describe('FrontDeclareComponent', () => {
  let component: FrontDeclareComponent;
  let fixture: ComponentFixture<FrontDeclareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontDeclareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontDeclareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
