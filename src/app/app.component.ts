import { Component, ViewChild } from '@angular/core';
import { BryntumSchedulerProComponent, BryntumProjectModelComponent } from '@bryntum/schedulerpro-angular';
import { schedulerProConfig, projectConfig } from './app.config';
import logs from '../assets/data/talend_logs.json'

@Component({
  selector    : 'body',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})

export class AppComponent {
  inputData: any;
  rowsArray: any[] = [];
  resourcesArray: any[] = [];
  assignmentsArray: any[] = [];

  constructor() {
    this.inputData = logs;
    const groupedData: any = {};


    for (const record of this.inputData.RECORDS) {
      const fatherPid = record.father_pid;

      if (!groupedData[fatherPid]) {

        groupedData[fatherPid] = {
          startDate: record.moment,
          endDate: record.moment,
          eventColor: 'green'
        };
      } else {

        groupedData[fatherPid].endDate = record.moment;
      }

      if (record.code === '1') {
        groupedData[fatherPid].eventColor = 'red';
      }
    }

    for (const fatherPid in groupedData) {
      if (groupedData.hasOwnProperty(fatherPid)) {
        this.resourcesArray.push({
          id: fatherPid,
          name: fatherPid
        });

        this.rowsArray.push({
          id: fatherPid,
          startDate: groupedData[fatherPid].startDate,
          endDate: groupedData[fatherPid].endDate,
          name: fatherPid,
          eventColor: groupedData[fatherPid].eventColor
        });

        this.assignmentsArray.push({
          event: fatherPid,
          resource: fatherPid
        });
      }
    }
  }

  resources = this.resourcesArray;
  events = this.rowsArray;
  assignments = this.assignmentsArray;

  schedulerProConfig = schedulerProConfig;
  projectConfig = projectConfig;

  @ViewChild('schedulerpro') schedulerProComponent!: BryntumSchedulerProComponent;
  @ViewChild('project') projectComponent!: BryntumProjectModelComponent;

}
