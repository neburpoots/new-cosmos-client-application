import { NgModule, inject } from "@angular/core";
import { Routes, RouterModule, mapToCanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// user views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";

// no layouts views

import { CalibrationGasesComponent } from "./views/admin/calibrationgases/index/calibrationgases.component";
import { DetectorComponent } from "./views/admin/detectors/detector.component";
import { AssemblyMultiversDetailComponent } from "./views/admin/assemblyMultivers/detail/assembly-multivers-detail.component";
import { AssemblyTypeComponent } from "./views/admin/assemblyType/assemblyType.component";
import { DetectorTypeComponent } from "./views/admin/detector-types/detector-type.component";
import { PrinciplesComponent } from "./views/admin/principles/index/principles.component";
import { GasesComponent } from "./views/admin/gases/index/gases.component";
import { ChemicalCompoundsComponent } from "./views/admin/chemical-compounds/index/chemical-compounds.component";
import { RangesComponent } from "./views/admin/ranges/index/ranges.component";
import { AreasComponent } from "./views/admin/areas/index/areas.component";
import { FloorsComponent } from "./views/admin/floors/index/floors.component";
import { BuildingsComponent } from "./views/admin/buildings/index/buildings.component";
import { ApplicationsComponent } from "./views/admin/applications/index/applications.component";
import { SamplePointsComponent } from "./views/admin/sample-points/index/sample-points.component";
import { PyrolysersComponent } from "./views/admin/pyrolysers/index/pyrolysers.component";
import { ORingsComponent } from "./views/admin/o-rings/index/o-rings.component";
import { FiltersComponent } from "./views/admin/filters/index/filters.component";
import { MembranesComponent } from "./views/admin/membranes/index/membranes.component";
import { ElectrolytesComponent } from "./views/admin/electrolytes/index/electrolytes.component";
import { SensorTypeComponent } from "./views/admin/sensor-types/index/sensor-types.component";
import { SensorBaseTypeComponent } from "./views/admin/sensor-base-types/index/sensor-base-types.component";
import { SensorTypeAssembliesComponent } from "./views/admin/sensor-types-assembly/index/sensor-types-assembly.component";
import { AssemblyMultiversComponent } from "./views/admin/assemblyMultivers/index/assembly-multivers.component";
import { UsersComponent } from "./views/admin/users/index/users.component";
import { GroupsComponent } from "./views/admin/groups/index/groups.component";
import { AuthGuard } from "./services/authentication/auth.guard";
import { faAddressCard, faBolt, faBoxOpen, faBoxesStacked, faBuilding, faCashRegister, faChartSimple, faClipboard, faCloud, faCodeCompare, faFilter, faFlaskVial, faGauge, faHouseSignal, faListUl, faMountainSun, faPaste, faPeopleGroup, faPlus, faRing, faRuler, faSatelliteDish, faServer, faShop, faShoppingBasket, faToiletPortable, faTowerBroadcast, faTowerCell, faUserCog, faUsers, faVial, faVialCircleCheck, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { NavBarIcon } from "./models/utils/navbarItem";
import { ProfileComponent } from "./views/admin/users/profile/profile.component";
import { StockSuppliersComponent } from "./views/admin/stock-suppliers/index/stock-suppliers.component";
import { StockSuppliersDetailComponent } from "./views/admin/stock-suppliers/detail/stock-suppliers-detail.component";
import { SensorTestResultsComponent } from "./views/admin/sensor-base-types copy/index/sensor-test-results.component";

//id is the permission id in db
export class RoutePermission {
  path: string;
  component: any;
  canActivate: any;
  permission_id: any;

  constructor(path: string, component: any, permission_id: any) {
    this.path = path;
    this.component = component;
    this.permission_id = permission_id;
    this.canActivate = [(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(next, state, permission_id)];
  }
}

export interface menuItem {
  name: string;
  active: boolean;
  icon6?: any;
  icon4?: string;
  items: NavBarIcon[];
}

//this is also used in sidebar. Thats why it is in this format
export const navigationObject: menuItem[] = [
  {
    name: "Assembly",
    icon4: "fa fa-cog",
    active: false,
    items: [
      {
        title: "Assemblies MV",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faUserCog,
        route: new RoutePermission("assemblies-multivers", AssemblyMultiversComponent, 6),
      },
      {
        title: "Assembly Types",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faCodeCompare,
        route: new RoutePermission("assembly-types", AssemblyTypeComponent, 9),
      },
      {
        title: "Calibration gases",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faCloud,
        route: new RoutePermission("calibration-gases", CalibrationGasesComponent, 8),
      },
      {
        title: "Detectors",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faChartSimple,
        route: new RoutePermission("detectors", DetectorComponent, 18),
      },
      {
        title: "Sensor Test Results",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faPaste,
        route: new RoutePermission("sensor-test-results", SensorTestResultsComponent, 29),
      },
      {
        title: "Sensor Types",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faTowerBroadcast,
        route: new RoutePermission("sensor-types-assembly", SensorTypeAssembliesComponent, 17),
      },
      {
        title: "Sensor Base Types",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faSatelliteDish,
        route: new RoutePermission("sensor-base-types", SensorBaseTypeComponent, 19),
      }
    ]
  },
  {
    name: "Warehouse",
    active: false,
    icon6: faWarehouse,
    items: [
      {
        title: "Stock Suppliers",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faBoxesStacked,
        route: new RoutePermission("stock-suppliers", StockSuppliersComponent, 10),
      },
    ]
  },
  {
    name: "Products",
    active: false,
    icon6: faBoxOpen,
    items: [
      {
        title: "Detector Types",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faGauge,
        route: new RoutePermission("detector-types", DetectorTypeComponent, 10),
      },
      {
        title: "Sensor Types",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faTowerBroadcast,
        route: new RoutePermission("sensor-types", SensorTypeComponent, 4),
      },
      {
        title: "Electrolytes",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faFlaskVial,
        route: new RoutePermission("electrolytes", ElectrolytesComponent, 15),
      },
      {
        title: "Membranes",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faBolt,
        route: new RoutePermission("membranes", MembranesComponent, 14),
      },
      {
        title: "Filters",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faFilter,
        route: new RoutePermission("filters", FiltersComponent, 13),
      },
      {
        title: "O-Rings",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faRing,
        route: new RoutePermission("o-rings", ORingsComponent, 12),
      },
      {
        title: "Pyrolysers",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faCashRegister,
        route: new RoutePermission("pyrolysers", PyrolysersComponent, 11),
      },
    ]
  },
  {
    name: "Registration",
    active: false,
    icon6: faAddressCard,
    items: [
      {
        title: "Users",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faUsers,
        route: new RoutePermission("users", UsersComponent, 1)
      },
      {
        title: "Groups",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faPeopleGroup,
        route: new RoutePermission("groups", GroupsComponent, 2)
      }
    ]
  },
  {
    name: 'Services',
    active: false,
    icon6: faServer,
    items: [
      {
        title: "Add Detector",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faPlus,
        route: new RoutePermission("add-detector", DetectorComponent, 18),
      },
      {
        title: "Add Sensor",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faPlus,
        route: new RoutePermission("add-sensor", SensorTypeComponent, 4),
      },
      {
        title: "Sensor Lists",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faTowerCell,
        route: new RoutePermission("sensor-types", SensorTypeComponent, 4),
      },
      {
        title: "Sample Points",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faHouseSignal,
        route: new RoutePermission("sample-points", SamplePointsComponent, 24),
      },
      {
        title: "Applications",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faToiletPortable,
        route: new RoutePermission("applications", ApplicationsComponent, 23),
      },
      {
        title: "Buildings",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faBuilding,
        route: new RoutePermission("buildings", BuildingsComponent, 22),
      },
      {
        title: "Floors",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faShop,
        route: new RoutePermission("floors", FloorsComponent, 21),
      },
      {
        title: "Areas",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faMountainSun,
        route: new RoutePermission("areas", AreasComponent, 20),
      },
    ]
  },
  {
    name: 'Misc',
    active: false,
    icon6: faListUl,
    items: [
      {
        title: "Principles",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faVialCircleCheck,
        route: new RoutePermission("principles", PrinciplesComponent, 16),
      },
      {
        title: "Chemical Compounds",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faVial,
        route: new RoutePermission("chemical-compounds", ChemicalCompoundsComponent, 26),
      },
      {
        title: "Gases",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faCloud,
        route: new RoutePermission("gases", GasesComponent, 25),
      },
      {
        title: "Ranges",
        active: false,
        // icon4: "ni-tv-2 text-primary",
        icon6: faRuler,
        route: new RoutePermission("ranges", RangesComponent, 27),
      },
    ]
  }
];

const insertRoutes = (menuItem : menuItem) => {
  return menuItem.items.map((item) => {
    return item.route
  })
}

export const allAuthenticatedRoutes = [
  ...insertRoutes(navigationObject[0]),
  ...insertRoutes(navigationObject[1]),
  ...insertRoutes(navigationObject[2]),
  ...insertRoutes(navigationObject[3]),
  ...insertRoutes(navigationObject[4]),
  ...insertRoutes(navigationObject[5]),
]


const routes: Routes = [
  // user views
  //id is the permission id
  {
    path: "",
    component: AdminComponent,
    children: [
      ...allAuthenticatedRoutes,
      new RoutePermission("profile", ProfileComponent, 7),
      new RoutePermission("assemblies-multivers/:id", AssemblyMultiversDetailComponent, 7),
      new RoutePermission("stock-suppliers/:id", StockSuppliersDetailComponent, 28),
      // new RoutePermission("", DashboardComponent, 5),
      new RoutePermission("", DashboardComponent, 5),
      
    ],
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "", redirectTo: "auth/login", pathMatch: "full" },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
