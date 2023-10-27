import { AfterViewInit, Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-chart100',
  templateUrl: './chart100.component.html',
  styleUrls: ['./chart100.component.scss']
})
export class Chart100Component implements OnChanges {
  chartOptions: ChartOptions = {
    series: [], // initialisez les séries vides
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      stackType: "100%"
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    xaxis: {
      categories: [], // initialisez les catégories vides
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: "right",
      offsetX: 0,
      offsetY: 50
    }
  };

  @Input() groupedData: any ;

  ngOnChanges(changes: SimpleChanges) {
    if (this.groupedData) {
      console.log(this.groupedData)
      this.updateChartOptions();
    }
  }


  updateChartOptions() {
    // Assume that this.groupedData.success is an array of data
    const successData = this.groupedData.success; // Array of data
    const errorData = this.groupedData.error; // Array of data


    this.chartOptions = {
      series: [
        {
          name: "Success",
          data: successData
        },
        {
          name: "error",
          data: errorData
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%"
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      xaxis: {
        categories: this.groupedData.Label, // Assuming categories are in Label
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: "right",
        offsetX: 0,
        offsetY: 50
      }
    };
  }
}
