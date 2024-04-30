import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleComponentSpecTsComponent } from './example-component.spec.ts.component';

describe('ExampleComponentSpecTsComponent', () => {
  let component: ExampleComponentSpecTsComponent;
  let fixture: ComponentFixture<ExampleComponentSpecTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleComponentSpecTsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExampleComponentSpecTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
