import { Component, OnInit, AfterViewInit, SimpleChanges, Input } from "@angular/core";
import { Chart } from "chart.js/auto";
import { DarkModeService } from "../../../services/darkmode/dark-mode.service";
import { DashboardTable } from "../../../../generated/graphql";

@Component({
  selector: "app-card-bar-chart",
  templateUrl: "./card-bar-chart.component.html",
})
export class CardBarChartComponent implements OnInit {

  @Input() data: DashboardTable[] = [];
  chart: Chart | undefined;

  darkModeService : DarkModeService;
  constructor(darkModeService : DarkModeService) {

    this.darkModeService = darkModeService;
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    // React to changes in input data
    // console.log(changes);
    if (changes['data']) {
      // console.log('test')
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

    let config : any = {
      type: "bar",
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
            data: this.data.filter((d) => d.year === new Date().getFullYear()).map((d) => +d.distinctOffertenummerCount) || [],
            fill: false,
            barThickness: 8,
          },
          {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: "#006666",
            borderColor: "#006666",
            data: this.data.filter((d) => d.year === new Date().getFullYear() - 1).map((d) => +d.distinctOffertenummerCount) || [],
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: true,
                labelString: "Month",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    let ctx: any = document.getElementById("bar-chart");
    ctx = ctx.getContext("2d");
    this.chart = new Chart(ctx, config);
  }
}
