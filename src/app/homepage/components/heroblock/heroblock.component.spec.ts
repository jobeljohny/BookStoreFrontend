import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroblockComponent } from './heroblock.component';

describe('HeroblockComponent', () => {
  let component: HeroblockComponent;
  let fixture: ComponentFixture<HeroblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroblockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
