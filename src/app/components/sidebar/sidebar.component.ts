import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/authentication/auth.service";
import { faBolt, faBoxOpen, faBuilding, faCashRegister, faChartSimple, faCloud, faCodeCompare, faEllipsis, faFilter, faFlaskVial, faGauge, faHouseSignal, faListUl, faMountain, faMountainSun, faPanorama, faPlus, faRing, faRuler, faSatelliteDish, faServer, faShop, faShoppingBasket, faToiletPortable, faTowerBroadcast, faTowerCell, faUserCog, faVial, faVialCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
import { NavBarIcon } from "../../models/utils/navbarItem";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  favoritesDropdownActive: boolean = false;
  assemblyDropdownActive: boolean = false;
  miscDropdownActive: boolean = false;
  servicesDropdownActive: boolean = false;
  productsDropdownActive: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  faVial = faVial
  faSatelliteDish = faSatelliteDish
  faCodeCompare = faCodeCompare
  faTowerBroadcast = faTowerBroadcast
  faShoppingBasket = faShoppingBasket
  faVialCircleCheck = faVialCircleCheck
  faCloud = faCloud
  faRuler = faRuler
  faEllipsis = faEllipsis
  faListUl = faListUl
  faMountainSun = faMountainSun
  faBuilding = faBuilding
  faShop = faShop
  faToiletPortable = faToiletPortable
  faHouseSignal = faHouseSignal
  faTowerCell = faTowerCell
  faPlus = faPlus
  faServer = faServer
  faCashRegister = faCashRegister
  faRing = faRing
  faFilter = faFilter
  faBolt = faBolt
  faFlaskVial = faFlaskVial
  faGauge = faGauge
  faBoxOpen = faBoxOpen
  faUserCog = faUserCog
  faChartSimple = faChartSimple

  assembly: NavBarIcon[] = [
    {
      title: "Assemblies MV",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faUserCog,
      url: "/user/assemblymultivers",
    },
    {
      title: "Assembly Types",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faCodeCompare,
      url: "/user/assembly-types",
    },
    {
      title: "Calibration gases",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faCloud,
      url: "/user/calibrationgases",
    },
    {
      title: "Detectors",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faChartSimple,
      url: "/user/detectors",
    },
    {
      title: "Sensor Types",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faTowerBroadcast,
      url: "/user/sensor-types-assembly",
    },
    {
      title: "Sensor Base Types",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faSatelliteDish,
      url: "/user/sensor-base-types",
    }
  ]

  products: NavBarIcon[] = [
    {
      title: "Detector Types",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faGauge,
      url: "/user/detector-types",
    },
    {
      title: "Sensor Types",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faTowerBroadcast,
      url: "/user/sensor-types",
    },
    {
      title: "Electrolytes",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faFlaskVial,
      url: "/user/electrolytes",
    },
    {
      title: "Membranes",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faBolt,
      url: "/user/membranes",
    },
    {
      title: "Filters",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faFilter,
      url: "/user/filters",
    },
    {
      title: "O-Rings",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faRing,
      url: "/user/o-rings",
    },
    {
      title: "Pyrolysers",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faCashRegister,
      url: "/user/pyrolysers",
    },
  ];


  services: NavBarIcon[] = [
    {
      title: "Add Detector",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faPlus,
      url: "/user/add-detector",
    },
    {
      title: "Add Sensor",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faPlus,
      url: "/user/add-sensor",
    },
    {
      title: "Sensor Lists",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faTowerCell,
      url: "/user/sensor-lists",
    },
    {
      title: "Sample Points",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faHouseSignal,
      url: "/user/sample-points",
    },
    {
      title: "Applications",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faToiletPortable,
      url: "/user/applications",
    },
    {
      title: "Buildings",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faBuilding,
      url: "/user/buildings",
    },
    {
      title: "Floors",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faShop,
      url: "/user/floors",
    },
    {
      title: "Areas",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faMountainSun,
      url: "/user/areas",
    },
  ];

  misc: NavBarIcon[] = [
    {
      title: "Principles",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faVialCircleCheck,
      url: "/user/principles",
    },
    {
      title: "Chemical Compounds",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faVial,
      url: "/user/chemical-compounds",
    },
    {
      title: "Gases",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faCloud,
      url: "/user/gases",
    },
    {
      title: "Ranges",
      active: false,
      // icon4: "ni-tv-2 text-primary",
      icon6: faRuler,
      url: "/user/ranges",
    },
  ];

  isActive(url: string): boolean {
    return this.router.isActive(url, true);
  }

  ngOnInit() { }

  toggleCollapseShow(classes: any) {
    this.collapseShow = classes;
  }

  logout() {
    this.authService.logout();
  }

  closeAllMenus() {
    this.assemblyDropdownActive = false;
    this.favoritesDropdownActive = false;
    this.miscDropdownActive = false;
    this.servicesDropdownActive = false;
    this.productsDropdownActive = false;
  }


  // Method to toggle the dropdown state
  toggleFavoritesDropdown() {
    let open = this.favoritesDropdownActive;
    this.closeAllMenus();
    this.favoritesDropdownActive = !open;
  }

  // Method to toggle the dropdown state
  toggleAssembliesDropdown() {
    this.closeAllMenus();
    this.assemblyDropdownActive = !this.assemblyDropdownActive;
  }

  // Method to toggle the dropdown state
  togglemiscDropdown() {
    this.closeAllMenus();
    this.miscDropdownActive = !this.miscDropdownActive;
  }

  // Method to toggle the dropdown state
  toggleServicesDropdown() {
    this.closeAllMenus();
    this.servicesDropdownActive = !this.servicesDropdownActive;
  }

  // Method to toggle the dropdown state
  toggleProductsDropdown() {
    this.closeAllMenus();
    this.productsDropdownActive = !this.productsDropdownActive;
  }
}
