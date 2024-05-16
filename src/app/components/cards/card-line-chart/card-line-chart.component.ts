import { Component, OnInit, AfterViewInit, Input, SimpleChanges } from "@angular/core";
import { Chart } from "chart.js";
import { DarkModeService } from "../../../services/darkmode/dark-mode.service";
import { DashboardTable } from "../../../../generated/graphql";

@Component({
  selector: "app-card-line-chart",
  templateUrl: "./card-line-chart.component.html",
})
export class CardLineChartComponent implements OnInit {

  @Input() data: DashboardTable[] = [];

  chart: Chart | undefined;

  darkModeService : DarkModeService;
  constructor(darkModeService : DarkModeService) {
    this.darkModeService = darkModeService;
  }

  ngOnInit() {}

  // ngOnAfterViewInit() {
  //   this.renderChart();
  // }

  ngOnChanges(changes: SimpleChanges) {
    // React to changes in input data
    console.log(changes);

    if (changes['data']) {

      console.log(changes);
      this.renderChart();
    }
  }

  ngOnDestroy() {
    // Ensure the chart instance is destroyed to prevent canvas reuse errors
    if (this.chart) {
      this.chart.destroy();
    }
  }


  renderChart() {
    if(this.chart) this.chart.destroy();

    console.log(this.data.filter((d) => d.year === new Date().getFullYear()))

    var config : any = {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#20c997",
            borderColor: "#20c997",
            data: this.data.filter((d) => d.year === new Date().getFullYear()).map((d) => +d.totalPerMonth) || [],
            fill: false,
          },
          {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: "#006666",
            borderColor: "#006666",
            data: this.data.filter((d) => d.year === new Date().getFullYear() - 1).map((d) => +d.totalPerMonth) || [],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: this.darkModeService.isDarkMode ? "rgba(0,0,0,.7)" : "rgba(255,255,255,.7)"
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    let ctx: any = document.getElementById("line-chart") as HTMLCanvasElement;
    ctx = ctx.getContext("2d");
    this.chart = new Chart(ctx, config);
  }
}
