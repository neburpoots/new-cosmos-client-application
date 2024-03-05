import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/authentication/auth.service";
import { faSatelliteDish, faVial } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  favoritesDropdownActive: boolean = false;
  assembleDropdownActive: boolean = false;

  constructor(private authService: AuthService) { }

  faVial = faVial
  faSatelliteDish = faSatelliteDish

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
}
