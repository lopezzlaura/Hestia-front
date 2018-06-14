import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontDeclareInhabitantComponent } from './front-declare-inhabitant.component';

describe('FrontDeclareInhabitantComponent', () => {
  let component: FrontDeclareInhabitantComponent;
  let fixture: ComponentFixture<FrontDeclareInhabitantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontDeclareInhabitantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontDeclareInhabitantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
