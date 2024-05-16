import { Component, OnInit } from "@angular/core";
import { DashboardGQL, DashboardTable } from "../../../../generated/graphql";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {

  data: DashboardTable[] = [];

  constructor(dashboardService : DashboardGQL) {
    dashboardService.fetch().subscribe((data) => {
      this.data = data?.data?.allDashboardTables?.nodes || [];
    
    console.log(this.data.filter((d) => d.year === new Date().getFullYear()))
    });
  }

  ngOnInit() {}
}
