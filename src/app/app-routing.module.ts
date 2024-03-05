import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// user views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";
import { AssemblyComponent } from "./views/admin/assembly/index/assembly.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { AuthGuard } from "./services/authentication/auth.guard";
import { CalibrationGasesComponent } from "./views/admin/calibrationgases/index/calibrationgases.component";
import { DetectorComponent } from "./views/admin/detectors/detector.component";
import { AssemblyMultiversComponent } from "./views/admin/assemblyMultivers/assembly-multivers.component";
import { AssemblyMultiversDetailComponent } from "./views/admin/assemblyMultivers/detail/assembly-multivers-detail.component";
import { SensorBaseTypeComponent } from "./views/admin/sensorBaseType/sensorBaseType.component";

const routes: Routes = [
  // user views
  {
    path: "user",
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "assembly", component: AssemblyComponent },
      { path: "assemblymultivers", component: AssemblyMultiversComponent },
      { path: "assemblymultivers/:id", component: AssemblyMultiversDetailComponent }, // Add the dynamic parameter ":userId"
      { path: "calibrationgases", component: CalibrationGasesComponent },
      { path: "detectors", component: DetectorComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
      { path: "sensor-base-types", component: SensorBaseTypeComponent},
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // no layout views
  { path: "profile", component: ProfileComponent },
  { path: "landing", component: LandingComponent },
  { path: "", component: IndexComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
