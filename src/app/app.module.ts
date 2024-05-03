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
import { UserComponent } from "./layouts/user/user.component";
import { PaginationComponent } from "./components/cards/card-pagination/pagination.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from "./components/modal/modal.component";
import { InputComponent } from "./components/form/input/input.component";
import { SelectComponent } from "./components/form/select/select.component";
import { ToastrModule } from 'ngx-toastr';
import { CalibrationGasesComponent } from "./views/admin/calibrationgases/index/calibrationgases.component";
import { DetectorComponent } from "./views/admin/detectors/detector.component";
import { DeleteModalComponent } from "./views/admin/delete/delete-modal.component";
import { DetectorFormComponent } from "./views/admin/detectors/form/detector-form.component";
import { CalibrationGasesFormComponent } from "./views/admin/calibrationgases/form/calibrationgases-form.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { PopOverComponent } from "./components/popover/popover.component";
import { SatPopoverModule } from '@ncstate/sat-popover';
import { AssemblyMultiversPopoverComponent } from "./views/admin/assemblyMultivers/popover/assembly-multivers-popover.component";
import { AssemblyMultiversDetailComponent } from "./views/admin/assemblyMultivers/detail/assembly-multivers-detail.component";
import { AssemblyTypeComponent } from "./views/admin/assemblyType/assemblyType.component";
import { GraphQLModule } from './graphql.module';
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
import { AreasComponent } from "./views/admin/areas/index/areas.component";
import { AreasFormComponent } from "./views/admin/areas/form/areas-form.component";
import { FloorsComponent } from "./views/admin/floors/index/floors.component";
import { FloorFormComponent } from "./views/admin/floors/form/floors-form.component";
import { BuildingFormComponent } from "./views/admin/buildings/form/building-form.component";
import { BuildingsComponent } from "./views/admin/buildings/index/buildings.component";
import { ApplicationsComponent } from "./views/admin/applications/index/applications.component";
import { ApplicationsFormComponent } from "./views/admin/applications/form/applications-form.component";
import { SamplePointsComponent } from "./views/admin/sample-points/index/sample-points.component";
import { SamplePointsFormComponent } from "./views/admin/sample-points/form/sample-point-form.component";
import { PyrolysersFormComponent } from "./views/admin/pyrolysers/form/pyrolysers-form.component";
import { PyrolysersComponent } from "./views/admin/pyrolysers/index/pyrolysers.component";
import { ORingsFormComponent } from "./views/admin/o-rings/form/o-rings-form.component";
import { ORingsComponent } from "./views/admin/o-rings/index/o-rings.component";
import { FiltersComponent } from "./views/admin/filters/index/filters.component";
import { FiltersFormComponent } from "./views/admin/filters/form/filters-form.component";
import { MembranesComponent } from "./views/admin/membranes/index/membranes.component";
import { MembranesFormComponent } from "./views/admin/membranes/form/membranes-form.component";
import { ElectrolytesFormComponent } from "./views/admin/electrolytes/form/electrolytes-form.component";
import { ElectrolytesComponent } from "./views/admin/electrolytes/index/electrolytes.component";
import { SensorTypeComponent } from "./views/admin/sensor-types/index/sensor-types.component";
import { SensorTypesFormComponent } from "./views/admin/sensor-types/form/sensor-types-form.component";
import { SensorBaseTypeComponent } from "./views/admin/sensor-base-types/index/sensor-base-types.component";
import { SensorBaseTypesFormComponent } from "./views/admin/sensor-base-types/form/sensor-base-types-form.component";
import { SensorTypeAssembliesComponent } from "./views/admin/sensor-types-assembly/index/sensor-types-assembly.component";
import { AssemblyMultiversComponent } from "./views/admin/assemblyMultivers/index/assembly-multivers.component";
import { ExportComponent } from "./components/export/export.component";
import { UsersFormComponent } from "./views/admin/users/form/users-form.component";
import { UsersComponent } from "./views/admin/users/index/users.component";
import { GroupsComponent } from "./views/admin/groups/index/groups.component";
import { GroupsFormComponent } from "./views/admin/groups/form/groups-form.component";
import { ProfileComponent } from "./views/admin/users/profile/profile.component";
import { registerLocaleData } from "@angular/common";

import localeEu from '@angular/common/locales/eu'; // Import the locale data for EU timezone
import { StockSuppliersComponent } from "./views/admin/stock-suppliers/index/stock-suppliers.component";
import { StockSuppliersFormComponent } from "./views/admin/stock-suppliers/form/stock-suppliers-form.component";
import { StockSuppliersDetailComponent } from "./views/admin/stock-suppliers/detail/stock-suppliers-detail.component";
import { BaseService } from "./services/base/base.service";
import { SensorTestResultsComponent } from "./views/admin/sensor-base-types copy/index/sensor-test-results.component";
import { SensorTestResultsFormComponent } from "./views/admin/sensor-base-types copy/form/sensor-test-results-form.component";
import { DarkModeSwitchComponent } from "./components/darkmode/dark-mode-switch.component";
import { DarkModeService } from "./services/darkmode/dark-mode.service";
import { AppInitializerService, initializeApp } from "./services/darkmode/app-inititializer.service";
registerLocaleData(localeEu);

@NgModule({
  declarations: [
    AppComponent,
    DarkModeSwitchComponent,
    ExportComponent,
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
    DetectorFormComponent,
    CalibrationGasesFormComponent,
    PopOverComponent,
    AssemblyMultiversComponent,
    AssemblyMultiversPopoverComponent,
    AssemblyMultiversDetailComponent,
    SensorBaseTypeComponent,
    SensorBaseTypesFormComponent,
    AssemblyTypeComponent,
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
    RangesFormComponent,
    AreasComponent,
    AreasFormComponent,
    FloorsComponent,
    FloorFormComponent,
    BuildingFormComponent,
    BuildingsComponent,
    ApplicationsComponent,
    ApplicationsFormComponent,
    SamplePointsComponent,
    SamplePointsFormComponent,
    PyrolysersFormComponent,
    PyrolysersComponent,
    ORingsFormComponent,
    ORingsComponent,
    FiltersComponent,
    FiltersFormComponent,
    MembranesComponent,
    MembranesFormComponent,
    ElectrolytesFormComponent,
    ElectrolytesComponent,
    SensorTypeComponent,
    SensorTypesFormComponent,
    SensorTypeAssembliesComponent,
    UsersComponent,
    UsersFormComponent,
    GroupsComponent,
    GroupsFormComponent,
    StockSuppliersComponent,
    StockSuppliersFormComponent,
    StockSuppliersDetailComponent,
    SensorTestResultsComponent,
    SensorTestResultsFormComponent
  ],
  imports: [ToastrModule.forRoot({
    timeOut: 2000, // Set the duration for which the toastr will be displayed (in milliseconds)
    positionClass: 'toast-bottom-right', // Set the position of the toastr
    closeButton: true, // Show or hide the close button
    progressBar: true, // Show or hide the progress bar
    progressAnimation: 'increasing', // Set the animation type for the progress bar ('increasing' or 'decreasing')
    preventDuplicates: true, // Prevent duplicate toastrs from being shown
  }), ReactiveFormsModule, BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, FormsModule, FontAwesomeModule, SatPopoverModule, ApolloModule, GraphQLModule],
  providers: [
    DarkModeService,
    AppInitializerService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitializerService],
      multi: true
    },
    AuthService,
    BaseService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
