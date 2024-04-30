import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ApplicationsComponent } from './index/applications.component';
import { AllApplicationsGQL, Application, DeleteApplicationGQL } from '../../../../generated/graphql';
import { FileService } from '../../../services/file/file.service';
import { AuthService } from '../../../services/authentication/auth.service';
import { BaseEntity } from '../base/base-entity.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ApplicationsComponent', () => {
  let component: ApplicationsComponent;
  let fixture: ComponentFixture<ApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationsComponent, BaseEntity<Application>],
      imports: [HttpClientTestingModule],
      // providers: [
      //   ToastrService,
      //   { provide: ActivatedRoute, useValue: {} },
      //   { provide: Router, useValue: {} },
      //   AllApplicationsGQL,
      //   DeleteApplicationGQL,
      //   FileService,
      //   AuthService
      // ],
      schemas: [NO_ERRORS_SCHEMA],

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should set edit data properly', () => {
  //   const mockSelectedItem = { id: 1, name: 'Test Application' }; // Mock selected item
  //   const childComponentSpy = spyOn(component.childComponent, 'setEditData'); // Spy on child component method
  //   component.selectedItem = mockSelectedItem;
  //   component.setEditData();
  //   expect(childComponentSpy).toHaveBeenCalledWith(mockSelectedItem);
  // });

  // Add more test cases as needed

});
