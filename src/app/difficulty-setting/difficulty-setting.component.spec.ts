import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultySettingComponent } from './difficulty-setting.component';

describe('DifficultySettingComponent', () => {
  let component: DifficultySettingComponent;
  let fixture: ComponentFixture<DifficultySettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DifficultySettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DifficultySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
