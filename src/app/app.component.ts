import { Component, ViewChild } from '@angular/core';
import { BryntumSchedulerProComponent, BryntumProjectModelComponent } from '@bryntum/schedulerpro-angular';
import { schedulerProConfig, projectConfig } from './app.config';
import logs from '../assets/data/data3.json'

@Component({
  selector    : 'body',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})

export class AppComponent {
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

        // Parcourez les éléments existants dans groupedData[job]
        for (const item of groupedData[job]) {
          if (item.id === record.father_pid) {
            // Si l'élément existe déjà, mettez à jour la valeur "endDate"
            item.endDate = record.moment;
            found = true;
            break;
          }
        }

        if (!found) {
          // Si l'élément n'a pas été trouvé, ajoutez-le
          groupedData[job].push({
            id: record.father_pid,
            name: record.father_pid,
            startDate: record.moment,
            endDate: record.moment,
            eventColor: record.code === '0' ? 'green' : 'red'
          });
        }
      }


      // if (!groupedData[fatherPid]) {
      //
      //   groupedData[fatherPid] = {
      //     startDate: record.moment,
      //     endDate: record.moment,
      //     eventColor: 'green'
      //   };
      // } else {
      //
      //   groupedData[fatherPid].endDate = record.moment;
      // }
      //
      // if (record.code === '1') {
      //   groupedData[fatherPid].eventColor = 'red';
      // }
      console.log(groupedData[job].name)
      console.log("--------------")

    }
    // console.log(groupedData[])
    for (const job in groupedData){
      if (groupedData.hasOwnProperty(job)){
        const jobData = groupedData[job]; // Accédez au tableau d'objets correspondant à ce job

        // Assurez-vous que le tableau jobData existe
        if (jobData && jobData.length > 0) {
          this.resourcesArray.push({
            id: job,
            name: job
          });

          // Accédez aux propriétés du premier objet dans le tableau
          this.eventArray.push({
            id: jobData[0].id,
            name: jobData[0].name,
            startDate: jobData[0].startDate,
            endDate: jobData[0].endDate,
            eventColor: jobData[0].eventColor
          });

          // Vous pouvez parcourir le tableau pour ajouter plusieurs assignments
          for (const item of jobData) {
            this.assignmentsArray.push({
              event: item.id,
              resource: job
            });
          }
        }
      }
    }

    // for (const fatherPid in groupedData) {
    //   if (groupedData.hasOwnProperty(fatherPid)) {
    //     this.resourcesArray.push({
    //       id: fatherPid,
    //       name: fatherPid
    //     });
    //
    //     this.eventArray.push({
    //       id: fatherPid,
    //       startDate: groupedData[fatherPid].startDate,
    //       endDate: groupedData[fatherPid].endDate,
    //       name: fatherPid,
    //       eventColor: groupedData[fatherPid].eventColor
    //     });
    //
    //     this.assignmentsArray.push({
    //       event: fatherPid,
    //       resource: fatherPid
    //     });
    //   }
    // }
    console.log(this.resourcesArray)
    console.log(this.eventArray)
    console.log(this.assignmentsArray)

  }


  resources = this.resourcesArray;
  events = this.eventArray;
  assignments = this.assignmentsArray;




  schedulerProConfig = schedulerProConfig;
  projectConfig = projectConfig;

  @ViewChild('schedulerpro') schedulerProComponent!: BryntumSchedulerProComponent;
  @ViewChild('project') projectComponent!: BryntumProjectModelComponent;

}
