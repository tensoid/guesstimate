import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuesstimateComponent } from './guesstimate.component';

describe('GuesstimateComponent', () => {
  let component: GuesstimateComponent;
  let fixture: ComponentFixture<GuesstimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuesstimateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuesstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
