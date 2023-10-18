import {Component, OnInit, ViewChild} from '@angular/core';
import { BryntumSchedulerProComponent, BryntumProjectModelComponent } from '@bryntum/schedulerpro-angular';
import { schedulerProConfig, projectConfig } from './app.config';
import logs from '../assets/data/data1.json'
import {SchedulerPro, DatePicker, DateHelper, Toast} from "@bryntum/schedulerpro";

@Component({
  selector    : 'body',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})

export class AppComponent{

  inputData: any;
  eventArray: any[] = [];
  resourcesArray: any[] = [];
  assignmentsArray: any[] = [];


  constructor() {

    this.inputData = logs;
    const groupedData: any = {};

    for (const record of this.inputData.RECORDS) {
      const job = record.job;

      if (!groupedData[job]) {
        groupedData[job] = [
          {
            id: record.father_pid,
            name: record.father_pid,
            startDate: record.moment,
            endDate: record.moment,
            eventColor: record.code === '0' ? 'green' : 'red'
          }
        ];
      } else {
        let found = false;

        for (const item of groupedData[job]) {
          if (item.id === record.father_pid) {
            item.endDate = record.moment;
            found = true;
            break;
          }
          if (record.code === '1'){
            item.eventColor = "red"
          }
        }

        if (!found) {

          groupedData[job].push({
            id: record.father_pid,
            name: record.father_pid,
            startDate: record.moment,
            endDate: record.moment,
            eventColor: record.code === '0' ? 'green' : 'red'
          });
        }
      }

    }
    for (const job in groupedData){
      if (groupedData.hasOwnProperty(job)){
        const jobData = groupedData[job];

        if (jobData && jobData.length > 0) {
          this.resourcesArray.push({
            id: job,
            name: job
          });

          for (const item of jobData){
            this.eventArray.push({
              id: item.id,
              name: item.name,
              startDate: item.startDate,
              endDate: item.endDate,
              eventColor: item.eventColor
            });
          }

          for (const item of jobData) {
            this.assignmentsArray.push({
              event: item.id,
              resource: job
            });
          }
        }
      }
    }

    console.log(this.resourcesArray)
    console.log(this.eventArray)
    console.log(this.assignmentsArray)


    new DatePicker({
      appendTo          : document.body,
      width             : '24em',
      date              : new Date(),
      onSelectionChange : ({ selection }) => {
        Toast.show(`You picked ${DateHelper.format(selection[0], 'MMM DD')}`);
      }
    });

    new SchedulerPro({
      appendTo : document.body,

      autoHeight : true,

      startDate :'2023-10-18',
      endDate   : '2023-10-19',

      viewPreset : 'hourAndDay',

      columns : [
        { field : 'name', text : 'Name', width : 100 }
      ],

      resources: [] = this.resourcesArray,

      events : [] = this.eventArray,

      assignments : [] = this.assignmentsArray,



    });




  }

  // resources = this.resourcesArray;
  // events = this.eventArray;
  // assignments = this.assignmentsArray;




  // scheduler = new SchedulerPro({
  //
  //   appendTo : document.body,
  //
  //   autoHeight : true,
  //   viewPreset : 'hourAndDay',
  //   startDate : '2023-10-18',
  //   endDate   : '2023-10-19',
  //
  //   columns : [
  //     {
  //       text : 'Name',
  //       field : 'name',
  //       width : 160
  //     }
  //   ],
  //
  //   resources : this.resourcesArray,
  //   events : this.eventArray,
  //   assignments : this.assignmentsArray,
  // })


  // schedulerProConfig = schedulerProConfig;
  // projectConfig = projectConfig;
  //
  // @ViewChild('schedulerpro') schedulerProComponent!: BryntumSchedulerProComponent;
  // @ViewChild('project') projectComponent!: BryntumProjectModelComponent;



}
