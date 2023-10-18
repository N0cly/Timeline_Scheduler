import {Component, OnInit, ViewChild} from '@angular/core';
import logs from '../assets/data/data2.json'
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
            id: record.id,
            name: record.father_pid,
            startDate: record.moment,
            endDate: record.moment,
            eventColor: record.code === '0' ? 'green' : 'red'
          }
        ];
      } else {
        let found = false;

        for (const item of groupedData[job]) {
          if (item.name === record.father_pid) {
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
            id: record.id,
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


    const datePicker = new DatePicker({
      appendTo: document.body,
      width: '24em',
      date: new Date(),
      onSelectionChange: ({ selection }: {selection:any}) => {
        const selectedDate = selection[0];
        scheduler.setStartDate(selectedDate);
        scheduler.refreshRows();
      }
    });

    const scheduler = new SchedulerPro({
      appendTo: document.body,
      autoHeight: true,
      startDate: '2023-10-18',
      endDate: '2023-10-19',
      viewPreset: 'hourAndDay',
      columns: [
        {
          field: 'name',
          text: 'Name',
          width: 250
        }
      ],
      resources: this.resourcesArray,
      events: this.eventArray,
      assignments: this.assignmentsArray
    });
  }
}
