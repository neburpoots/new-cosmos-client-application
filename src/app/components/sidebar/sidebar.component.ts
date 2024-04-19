import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/authentication/auth.service";
import { faAddressCard, faBolt, faBoxOpen, faBuilding, faCashRegister, faChartSimple, faCloud, faCodeCompare, faEllipsis, faFilter, faFlaskVial, faGauge, faHouseSignal, faListUl, faMountain, faMountainSun, faPanorama, faPeopleGroup, faPlus, faRing, faRuler, faSatelliteDish, faServer, faShop, faShoppingBasket, faToiletPortable, faTowerBroadcast, faTowerCell, faUserCog, faUsers, faVial, faVialCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
import { NavBarIcon } from "../../models/utils/navbarItem";
import { navigationObject } from "../../app-routing.module";

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
  registrationDropdownActive: boolean = false;

  constructor(protected authService: AuthService, private router: Router) { }

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
  faUsers = faUsers
  faPeopleGroup = faPeopleGroup
  faAddressCard = faAddressCard

  navigationObject = navigationObject

  isActive(url: string): boolean {
    return this.router.isActive('user/' + url, true);
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
    this.registrationDropdownActive = false;

  }


  // Method to toggle the dropdown state
  toggleFavoritesDropdown() {
    let open = this.favoritesDropdownActive;
    this.closeAllMenus();
    this.favoritesDropdownActive = !open;
  }

  toggleNavbarDropdown(index: number) {

    this.navigationObject.forEach((item, i) => {
      if (i !== index) {
        item.active = false;
      }
    })

    this.navigationObject[index].active = !this.navigationObject[index].active;
  }
}
