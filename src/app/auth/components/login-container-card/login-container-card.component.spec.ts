import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginContainerCardComponent } from './login-container-card.component';

describe('LoginContainerCardComponent', () => {
  let component: LoginContainerCardComponent;
  let fixture: ComponentFixture<LoginContainerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginContainerCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginContainerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
