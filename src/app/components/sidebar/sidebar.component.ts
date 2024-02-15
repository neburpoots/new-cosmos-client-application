import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  favoritesDropdownActive: boolean = false;

  constructor() {}

  ngOnInit() {}
  toggleCollapseShow(classes : any) {
    this.collapseShow = classes;
  }


  // Method to toggle the dropdown state
  toggleFavoritesDropdown() {
    this.favoritesDropdownActive = !this.favoritesDropdownActive;
  }
}
