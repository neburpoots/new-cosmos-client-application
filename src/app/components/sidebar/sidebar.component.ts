import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/authentication/auth.service";
import { faAddressCard, faBolt, faBoxOpen, faBuilding, faCashRegister, faChartSimple, faCloud, faCodeCompare, faEllipsis, faFilter, faFlaskVial, faGauge, faHouseSignal, faListUl, faMountain, faMountainSun, faPanorama, faPeopleGroup, faPlus, faRing, faRuler, faSatelliteDish, faServer, faShop, faShoppingBasket, faToiletPortable, faTowerBroadcast, faTowerCell, faUserCog, faUsers, faVial, faVialCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
import { NavBarIcon } from "../../models/utils/navbarItem";
import { navigationObject } from "../../app-routing.module";
import { forEach } from "cypress/types/lodash";

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

  constructor(protected authService: AuthService, private router: Router) {

    this.navigationObject.forEach((item, i) => {
      item.show = false;
    })

    this.navigationObject.forEach((item, i) => {
      item.items.forEach((subItem, j) => {
        this.authService.checkPermission(subItem.route.permission_id).subscribe(allowed => {
          this.authService.currentReadPermissions$.subscribe(permissions => console.log(JSON.parse(JSON.stringify(permissions))))
          if (allowed) {
            item.show = true;
          }
        });
      });
    })

  }

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

  navigationObject = [...navigationObject]

  isActive(url: string): boolean {
    return this.router.isActive(url, true);
  }

  ngOnInit() {

  }

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

  isAllowedCurrentItem: boolean = false;
  //check permissions for main menu button if all submenus false then return false
  checkPermissionForAll(items: NavBarIcon[]): any {


    for (let item of items) {

      const result = this.authService.checkPermission(item.route.permission_id).subscribe(allowed => {
        if (allowed) {
          return true;
        } else {
          return false;
        }
      })
      console.log(result)
      return true;
      // console.log(item.route.permission_id)
      // console.log(this.authService.currentReadPermissions$.subscribe(permissions => console.log(permissions)))
      // console.log(this.authService.checkPermission(item.route.permission_id))
      // if(this.authService.checkPermission(item.route.permission_id)) {
      //   return true;
      // }
    }


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
