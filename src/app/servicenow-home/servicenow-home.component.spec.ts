import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicenowHomeComponent } from './servicenow-home.component';

describe('ServicenowHomeComponent', () => {
  let component: ServicenowHomeComponent;
  let fixture: ComponentFixture<ServicenowHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicenowHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicenowHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
