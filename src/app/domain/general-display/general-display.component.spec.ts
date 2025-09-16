import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDisplayComponent } from './general-display.component';

describe('GeneralDisplayComponent', () => {
  let component: GeneralDisplayComponent;
  let fixture: ComponentFixture<GeneralDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
