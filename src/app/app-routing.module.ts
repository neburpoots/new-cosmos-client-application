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
import { CalibrationGasesComponent } from "./views/admin/calibrationgases/index/calibrationgases.component";
import { DetectorComponent } from "./views/admin/detectors/detector.component";
import { AssemblyMultiversComponent } from "./views/admin/assemblyMultivers/assembly-multivers.component";
import { AssemblyMultiversDetailComponent } from "./views/admin/assemblyMultivers/detail/assembly-multivers-detail.component";
import { SensorBaseTypeComponent } from "./views/admin/sensorBaseType/sensorBaseType.component";
import { AssemblyTypeComponent } from "./views/admin/assemblyType/assemblyType.component";
import { SensorTypeComponent } from "./views/admin/sensor-type/sensor-type.component";
import { DetectorTypeComponent } from "./views/admin/detector-types/detector-type.component";
import { PrinciplesComponent } from "./views/admin/principles/index/principles.component";
import { GasesComponent } from "./views/admin/gases/index/gases.component";
import { ChemicalCompoundsComponent } from "./views/admin/chemical-compounds/index/chemical-compounds.component";
import { RangesComponent } from "./views/admin/ranges/index/ranges.component";
import { AreasComponent } from "./views/admin/areas/index/areas.component";
import { FloorsComponent } from "./views/admin/floors/index/floors.component";

const routes: Routes = [
  // user views
  {
    path: "user",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "assembly", component: AssemblyComponent },
      { path: "assemblymultivers", component: AssemblyMultiversComponent },
      { path: "assemblymultivers/:id", component: AssemblyMultiversDetailComponent }, // Add the dynamic parameter ":userId"
      { path: "calibrationgases", component: CalibrationGasesComponent },
      { path: "assembly-types", component: AssemblyTypeComponent },
      { 
        path: 'assembly-types/:id', 
        component: AssemblyTypeComponent,		
      },
      {
        path: 'detector-types',
        component: DetectorTypeComponent
      },
      {
        path: 'principles',
        component: PrinciplesComponent
      },
      { path: "detectors", component: DetectorComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
      { path: "sensor-base-types", component: SensorBaseTypeComponent},
      { path: "sensor-types", component: SensorTypeComponent},
      { path: "areas", component: AreasComponent },
      { path: "floors", component: FloorsComponent },
      { path: "gases", component: GasesComponent},
      { path: "chemical-compounds", component: ChemicalCompoundsComponent},
      { path: "ranges", component: RangesComponent},
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
