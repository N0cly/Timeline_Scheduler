import { Component, ViewChild } from '@angular/core';
import { BryntumSchedulerProComponent, BryntumProjectModelComponent } from '@bryntum/schedulerpro-angular';
import { schedulerProConfig, projectConfig } from './app.config';
import {SchedulerPro, Store} from "@bryntum/schedulerpro";
import logs from '../assets/data/talend_logs.json'

@Component({
  selector    : 'body',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})

export class AppComponent {

  // scheduler = new SchedulerPro({

  //
  //   appendTo : document.body,
  //
  //   // width : document.body.clientWidth,
  //   // height : document.body.clientHeight,
  //
  //   startDate : '2022-01-01 01:00:00',
  //   endDate   : '2022-01-01 23:59:59',
  //
  //   columns : [
  //     {
  //       field : 'name',
  //       text  : 'Name'
  //     }, {
  //       field : 'role',
  //       text  : 'Role'
  //     }
  //   ],
  //
  //   project : {
  //     loadUrl  : 'http://localhost:3000/project',
  //     autoLoad : true
  //   }
  //
  // })


  inputData: any;
  rowsArray: any[] = [];
  ressourcesArray: any[] = [];
  assignementArray: any[] = [];
  constructor() {
    this.inputData = logs;

    for (const record of this.inputData.RECORDS){
      const newRessource = {
        "id" : record.id,
        "name": record.father_pid
      }
      // console.log(newRessource)
      this.ressourcesArray.push(newRessource)
    }
     console.log(this.ressourcesArray)

    for (const record of this.inputData.RECORDS) {
      const newRow = {
        "id": record.id,
        "startDate": record.moment,
        "endDate": record.moment,
        "name": record.father_pid
      };
      // console.log(newRow)
      this.rowsArray.push(newRow);
    }
     console.log(this.rowsArray)


    for (const record of this.inputData.RECORDS){
      const newAssignement = {
        "event": record.id,
        "resource": record.id
      };
      // console.log(newAssignement)
      this.assignementArray.push(newAssignement)
    }
     console.log(this.assignementArray)

    // const outputData = {
    //   events: {
    //     rows: this.rowsArray
    //   }
    // };

    // console.log(typeof outputData)

    // const outputJson = JSON.stringify(outputData, null, 2);

    //console.log(typeof outputJson)
  }

  resources = this.ressourcesArray

  // resources = [
  //   { id : 1, name : 'Dan Stevenson' },
  //   { id : 2, name : 'Talisha Babin' }
  // ];

  events = this.rowsArray

  // events = [
  //   { "id" : 1,
  //     "startDate" : "2022-01-01 09:28:04",
  //     "duration" : 3,
  //     "durationUnit" : "d",
  //     "name" :"Event 1"
  //   },
  //   { "id" : 2,
  //     "startDate" : "2022-01-01 09:59:50",
  //     "endDate" : "2022-01-01 10:00:06",
  //     "name" : "Event 2",
  //     "eventColor" : "violet"
  //   }
  // ];

  assignments = this.assignementArray

  // assignments = [
  //   { event : 1, resource : 1 },
  //   { event : 2, resource : 2 }
  // ];

  // dependencies = [
  //   { fromEvent : 1, toEvent : 2 }
  // ];

  schedulerProConfig = schedulerProConfig;
  projectConfig = projectConfig;

  @ViewChild('schedulerpro') schedulerProComponent!: BryntumSchedulerProComponent;
  @ViewChild('project') projectComponent!: BryntumProjectModelComponent;

}
