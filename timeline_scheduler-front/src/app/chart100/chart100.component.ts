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
    series: [],
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
      categories: [],
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
      console.log('-----Charts100-----')
      console.log(this.groupedData);
      this.updateChartOptions();
    }
  }


  updateChartOptions() {
    const successData = this.groupedData.success;
    const errorData = this.groupedData.error;


    this.chartOptions = {
      series: [
        {
          name: "Success",
          data: successData,
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
        stackType: "100%",

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
        categories: this.groupedData.label,

      },
      fill: {
        opacity: 1,
        colors : [
          '#66bb6a',
          '#ef5350'
        ]
      },

      legend: {

        markers: {
          fillColors: [
            '#66bb6a',
            '#ef5350'
          ]
        },
        // labels: {
        //   colors : [
        //     '#66bb6a',
        //     '#ef5350'
        //   ]
        // },
        position: "right",
        offsetX: 0,
        offsetY: 50
      }
    };
  }
}
