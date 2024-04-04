import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";

// components for views and layouts

import { AdminNavbarComponent } from "./components/navbars/admin-navbar/admin-navbar.component";
import { AuthNavbarComponent } from "./components/navbars/auth-navbar/auth-navbar.component";
import { CardBarChartComponent } from "./components/cards/card-bar-chart/card-bar-chart.component";
import { CardLineChartComponent } from "./components/cards/card-line-chart/card-line-chart.component";
import { CardPageVisitsComponent } from "./components/cards/card-page-visits/card-page-visits.component";
import { CardProfileComponent } from "./components/cards/card-profile/card-profile.component";
import { CardSettingsComponent } from "./components/cards/card-settings/card-settings.component";
import { CardSocialTrafficComponent } from "./components/cards/card-social-traffic/card-social-traffic.component";
import { CardStatsComponent } from "./components/cards/card-stats/card-stats.component";
import { CardTableComponent } from "./components/cards/card-table/card-table.component";
import { FooterAdminComponent } from "./components/footers/footer-admin/footer-admin.component";
import { FooterComponent } from "./components/footers/footer/footer.component";
import { FooterSmallComponent } from "./components/footers/footer-small/footer-small.component";
import { HeaderStatsComponent } from "./components/headers/header-stats/header-stats.component";
import { IndexNavbarComponent } from "./components/navbars/index-navbar/index-navbar.component";
import { MapExampleComponent } from "./components/maps/map-example/map-example.component";
import { IndexDropdownComponent } from "./components/dropdowns/index-dropdown/index-dropdown.component";
import { TableDropdownComponent } from "./components/dropdowns/table-dropdown/table-dropdown.component";
import { PagesDropdownComponent } from "./components/dropdowns/pages-dropdown/pages-dropdown.component";
import { NotificationDropdownComponent } from "./components/dropdowns/notification-dropdown/notification-dropdown.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { UserDropdownComponent } from "./components/dropdowns/user-dropdown/user-dropdown.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from "./services/authentication/auth.service";
import { AssemblyComponent } from "./views/admin/assembly/index/assembly.component";
import { UserComponent } from "./layouts/user/user.component";
import { PaginationComponent } from "./components/cards/card-pagination/pagination.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from "./components/modal/modal.component";
import { AssemblyCreateComponent } from "./views/admin/assembly/create/assembly-create.component";
import { InputComponent } from "./components/form/input/input.component";
import { SelectComponent } from "./components/form/select/select.component";
import { ToastrModule } from 'ngx-toastr';
import { CalibrationGasesComponent } from "./views/admin/calibrationgases/index/calibrationgases.component";
import { AbstractComponent } from "./views/admin/abstract/abstract.component";
import { DetectorComponent } from "./views/admin/detectors/detector.component";
import { DeleteModalComponent } from "./views/admin/delete/delete-modal.component";
import { AssemblyFormComponent } from "./views/admin/assembly/form/assembly-form.component";
import { DetectorFormComponent } from "./views/admin/detectors/form/detector-form.component";
import { CalibrationGasesFormComponent } from "./views/admin/calibrationgases/form/calibrationgases-form.component";
import { AssemblyMultiversComponent } from "./views/admin/assemblyMultivers/assembly-multivers.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { PopOverComponent } from "./components/popover/popover.component";
import { SatPopoverModule } from '@ncstate/sat-popover';
import { AssemblyMultiversPopoverComponent } from "./views/admin/assemblyMultivers/popover/assembly-multivers-popover.component";
import { AssemblyMultiversDetailComponent } from "./views/admin/assemblyMultivers/detail/assembly-multivers-detail.component";
import { SensorBaseTypeComponent } from "./views/admin/sensorBaseType/sensorBaseType.component";
import { SensorBaseTypeFormComponent } from "./views/admin/sensorBaseType/form/sensorBaseTypeForm.component";
import { AssemblyTypeComponent } from "./views/admin/assemblyType/assemblyType.component";
import { SensorTypeComponent } from "./views/admin/sensor-type/sensor-type.component";
import { SensorTypeFormComponent } from "./views/admin/sensor-type/form/sensor-type-form.component";
import { GraphQLModule } from './graphql.module';
import { ApolloClientService } from "./apollo-client.service";
import { APOLLO_OPTIONS, ApolloModule } from "apollo-angular";
import { TableComponent } from "./components/table/table.component";
import { PaginationTableComponent } from "./components/pagination/pagination.component";
import { DetectorTypeComponent } from "./views/admin/detector-types/detector-type.component";
import { DetectorTypeFormComponent } from "./views/admin/detector-types/form/detector-type-form.component";
import { PrinciplesFormComponent } from "./views/admin/principles/form/principles-form.component";
import { PrinciplesComponent } from "./views/admin/principles/index/principles.component";
import { GasesComponent } from "./views/admin/gases/index/gases.component";
import { GasesFormComponent } from "./views/admin/gases/form/gases-form.component";
import { ChemicalCompoundsComponent } from "./views/admin/chemical-compounds/index/chemical-compounds.component";
import { ChemicalCompoundsFormComponent } from "./views/admin/chemical-compounds/form/chemical-compounds-form.component";
import { RangesComponent } from "./views/admin/ranges/index/ranges.component";
import { RangesFormComponent } from "./views/admin/ranges/form/ranges-form.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PaginationComponent,
    CardBarChartComponent,
    CardLineChartComponent,
    IndexDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSettingsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    HeaderStatsComponent,
    MapExampleComponent,
    AuthNavbarComponent,
    AdminNavbarComponent,
    IndexNavbarComponent,
    AdminComponent,
    UserComponent,
    AuthComponent,
    MapsComponent,
    SettingsComponent,
    TablesComponent,
    AssemblyComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    LandingComponent,
    ProfileComponent,
    ModalComponent,
    InputComponent,
    SelectComponent,
    CalibrationGasesComponent,
    DetectorComponent,
    DeleteModalComponent,
    AssemblyFormComponent,
    DetectorFormComponent,
    CalibrationGasesFormComponent,
    AssemblyMultiversComponent,
    PopOverComponent,
    AssemblyMultiversPopoverComponent,
    AssemblyMultiversDetailComponent,
    SensorBaseTypeComponent,
    SensorBaseTypeFormComponent,
    AssemblyTypeComponent,
    AssemblyCreateComponent,
    SensorTypeComponent,
    SensorTypeFormComponent,
    TableComponent,
    PaginationTableComponent,
    DetectorTypeComponent,
    DetectorTypeFormComponent,
    PrinciplesComponent,
    PrinciplesFormComponent,
    GasesComponent,
    GasesFormComponent,
    ChemicalCompoundsComponent,
    ChemicalCompoundsFormComponent,
    RangesComponent,
    RangesFormComponent
  ],
  imports: [ToastrModule.forRoot({
    timeOut: 2000, // Set the duration for which the toastr will be displayed (in milliseconds)
    positionClass: 'toast-bottom-right', // Set the position of the toastr
    closeButton: true, // Show or hide the close button
    progressBar: true, // Show or hide the progress bar
    progressAnimation: 'increasing', // Set the animation type for the progress bar ('increasing' or 'decreasing')
    preventDuplicates: true, // Prevent duplicate toastrs from being shown
  }), ReactiveFormsModule, BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, FormsModule, FontAwesomeModule, SatPopoverModule, ApolloModule],
  providers: [AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: (apolloClientService: ApolloClientService) =>
      {
        return () => apolloClientService.getOptionsPromise();
      },
      deps: [ApolloClientService],
      multi: true,
    },			
    // { 
    //   provide: HTTP_INTERCEPTORS, 
    //   useClass: JwtInterceptor, 
    //   multi: true 
    // },			
    {
      provide: APOLLO_OPTIONS,
      useFactory: (apolloClientService: ApolloClientService) => apolloClientService.getOptions(),
      deps: [ApolloClientService, APP_INITIALIZER],
    },
  
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
