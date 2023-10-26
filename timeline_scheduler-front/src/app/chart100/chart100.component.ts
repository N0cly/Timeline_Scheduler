import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexPlotOptions,
    ApexResponsive,
    ApexXAxis,
    ApexLegend,
    ApexFill
} from "ng-apexcharts";


export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    // dataLabels: ApexDataLabels;
    // plotOptions: ApexPlotOptions;
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
export class Chart100Component{
    chartOptions: ChartOptions;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "PRODUCT A",
                    data: [44, 55, 41, 67, 22, 43, 21, 49]
                },
                {
                    name: "PRODUCT B",
                    data: [13, 23, 20, 8, 13, 27, 33, 12]
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
                categories: [
                    "2011 Q1",
                    "2011 Q2",
                    "2011 Q3",
                    "2011 Q4",
                    "2012 Q1",
                    "2012 Q2",
                    "2012 Q3",
                    "2012 Q4"
                ]
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
