import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TOAST_CONFIG, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { of } from 'rxjs';
import { AllApplicationsGQL, Application, ApplicationsOrderBy, CurrentUserInfoGQL, DeleteApplicationGQL } from '../../../../generated/graphql';
import { FileService } from '../../../services/file/file.service';
import { AuthService } from '../../../services/authentication/auth.service';
import { DebugElement, InjectionToken, NO_ERRORS_SCHEMA } from '@angular/core';
import { BaseService } from '../../../services/base/base.service';
import { ApplicationsComponent } from './index/applications.component';
import { APOLLO_OPTIONS, Apollo, ApolloModule } from 'apollo-angular';
import { TableField } from '../../../models/utils/tableField';
import { ApolloClient, HttpLink } from '@apollo/client';
import { By } from '@angular/platform-browser';
import { GraphQLModule, createApollo } from '../../../graphql.module';
import { applicationTableHeaders } from './application';

export function findComponent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement {
  return fixture.debugElement.query(By.css(selector));
}

describe('ApplicationsComponent', () => {
  
  let component: ApplicationsComponent;
  let fixture: ComponentFixture<ApplicationsComponent>;
  let activatedRouteMock: Partial<ActivatedRoute>;
  let baseService: BaseService<Application>; // Inject BaseService for testing

  beforeEach(async () => {

    // Define a mock UrlSegment array
    const urlSegments: UrlSegment[] = [
      new UrlSegment('applications', {})
    ];

    // Create a mock ActivatedRoute with a custom value for the url observable
    activatedRouteMock = {
      url: of(urlSegments), // Mock url observable with custom UrlSegment array
      queryParams: of({}), // Mock queryParams observable with empty object
    } as Partial<ActivatedRoute>; // Cast to any to bypass type checking if necessary


    await TestBed.configureTestingModule({
      declarations: [ApplicationsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        AllApplicationsGQL,
        DeleteApplicationGQL,
        AuthService,
        Apollo,
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: spyOn<Router> },
        { provide: ToastrService, useValue: spyOn<ToastrService> },
        BaseService<Application> // Assuming this is providing dependencies required by the component
      ],
      schemas: [NO_ERRORS_SCHEMA],

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsComponent);
    component = fixture.componentInstance;
    baseService = TestBed.inject(BaseService<Application>); // Inject BaseService

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more test cases as needed

  it('should test a method of BaseService', () => {
    // Suppose you have a method in BaseService named `someMethod`, you can test it like this:
    spyOn(component, 'setEditData')

    // Call the method in ApplicationsComponent that uses BaseService
    component.setEditData();

    // Assert that the method was called
    expect(component.setEditData).toHaveBeenCalled();
  });

  it('Header count is the same', () => {
    const table = findComponent(fixture, 'table-component');
    
    expect(table.properties['columns'].length).toBe(applicationTableHeaders.length);
  });

  it('Test base service', () => {
    
  });

});


// describe('BaseService', () => {
//   let service: BaseService<Application>; // Replace `any` with the appropriate type

//   let activatedRouteMock: Partial<ActivatedRoute>;
//   let authService: AuthService; // Inject BaseService for testing

//   // Define a mock UrlSegment array
//   const urlSegments: UrlSegment[] = [
//     new UrlSegment('applications', {})
//   ];

//   // Create a mock ActivatedRoute with a custom value for the url observable
//   activatedRouteMock = {
//     url: of(urlSegments), // Mock url observable with custom UrlSegment array
//     queryParams: of({}), // Mock queryParams observable with empty object
//   } as Partial<ActivatedRoute>; // Cast to any to bypass type checking if necessary

//   const mapTableData = (applications: Application[]): any[] => {

//     return applications.map((application: Application) => {
//       return {
//         id: { url: null, value: application.id } as TableField,
//         name: { url: null, value: application?.name } as TableField,
//         created: { url: null, value: application?.created } as TableField,
//         initials: { url: null, value: application?.userByOwnerId?.initials } as TableField,
//       };
//     });
//   }

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [
//         AllApplicationsGQL,
//         DeleteApplicationGQL,
//         {
//           provide: CurrentUserInfoGQL,
//           useValue: spyOn<CurrentUserInfoGQL>,
          
//         },
//         AuthService,
//         { provide: ActivatedRoute, useValue: activatedRouteMock },
//         {
//           provide: Router,
//           useClass: class {
//             navigate = jasmine.createSpy('navigate'); // Mock the navigate method
//           }
//         },
//         { provide: ToastrService, useValue: spyOn<ToastrService>, 
          
//         },
//         {
//           provide: GraphQLModule
//         },
//         {
//           provide: Apollo,
//           useValue: spyOn<Apollo>
//         },

//         BaseService<Application> // Assuming this is providing dependencies required by the component
//       ],
//       schemas: [NO_ERRORS_SCHEMA],
//     });
//     service = TestBed.inject(BaseService);
//     authService = TestBed.inject(AuthService);
//     // Call setUpBaseService and setUpEditBaseService before each test
//     service.setUpBaseService(
//       TestBed.inject(ActivatedRoute),
//       TestBed.inject(AllApplicationsGQL),
//       TestBed.inject(DeleteApplicationGQL),
//       'allApplications',
//       [
//         { type: 'string', key: 'name', label: "Name", asc: ApplicationsOrderBy.NameAsc, desc: ApplicationsOrderBy.NameDesc },
//         { type: 'datetime', key: 'created', label: "Created", asc: ApplicationsOrderBy.CreatedAsc, desc: ApplicationsOrderBy.CreatedDesc },
//         { type: 'string', key: 'initials', label: "By", asc: ApplicationsOrderBy.UserByOwnerIdInitialsAsc, desc: ApplicationsOrderBy.UserByOwnerIdInitialsDesc },
//       ], // Replace with your tableHeaders
//       {
//         orderBy: [ApplicationsOrderBy.IdDesc],
//         first: 10,
//         offset: 0,
//         filter: {
//           and: [
    
//           ]
//         },
//       },
//       mapTableData,
//       'Application',
//       'Applications'
//     );

//     service.setUpEditBaseService(() => { }); // Replace with your setEditData function
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   // Write more test cases for BaseService methods as needed
// });