import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/authentication/auth.service";
import { faBuilding, faCloud, faCodeCompare, faEllipsis, faHouseSignal, faListUl, faMountain, faMountainSun, faPanorama, faPlus, faRuler, faSatelliteDish, faServer, faShop, faShoppingBasket, faToiletPortable, faTowerBroadcast, faTowerCell, faVial, faVialCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
import { NavBarIcon } from "../../models/utils/navbarItem";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  favoritesDropdownActive: boolean = false;
  assembleDropdownActive: boolean = false;
  productDropdownActive: boolean = false;
  miscDropdownActive: boolean = false;
  servicesDropdownActive: boolean = false;


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

  misc : NavBarIcon[] = [
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


  // Method to toggle the dropdown state
  toggleFavoritesDropdown() {
    this.favoritesDropdownActive = !this.favoritesDropdownActive;
  }

  // Method to toggle the dropdown state
  toggleAssembliesDropdown() {
    this.assembleDropdownActive = !this.assembleDropdownActive;
  }

  // Method to toggle the dropdown state
  toggleProductsDropdown() {
    this.productDropdownActive = !this.productDropdownActive;
  }

  // Method to toggle the dropdown state
  togglemiscDropdown() {
    this.miscDropdownActive = !this.miscDropdownActive;
  }

  // Method to toggle the dropdown state
  toggleServicesDropdown() {
    this.servicesDropdownActive = !this.servicesDropdownActive;
  }
}
