import { Component } from '@angular/core';
import { SchedulerPro, DatePicker, DateHelper } from "@bryntum/schedulerpro";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  inputData: any;
  eventArray: any[] = [];
  resourcesArray: any[] = [];
  assignmentsArray: any[] = [];
  moment: string = '';

   dateTest = new Date()
   year = this.dateTest.getFullYear()
   month = this.dateTest.getMonth()+1
   day = this.dateTest.getDate()
   day1 = this.dateTest.getDate()+1

   dateToday = `${this.year}-${this.month}-${this.day}`
   dateTomorrow = `${this.year}-${this.month}-${this.day1}`

  constructor(private http: HttpClient) {
    // Fonction pour récupérer les données avec une date donnée
    // const  requestData = (moment: string)=> {
    //   let url = `http://localhost:8000/api/job/planning/get/${moment}`;
    //   http.get(url).subscribe((data: any) => {
    //     // console.log(data);
    //     // Mettez à jour les données
    //     this.inputData = data;
    //     processInputData(this.inputData);
    //   });
    // }

    const requestDataPost = (moment: string) => {

      const httpOptions = {
        headers: new HttpHeaders({
          "Content-type":`multipart/form-data; charset=utf-8; boundary=  ${Math.random().toString().substr(2)}`,
          "Content-length":"128"
        })
      };
      let url = 'http://localhost:8000/api/job/planning/post';
      let date = {date : moment}

      this.http.post<any>(url, date, httpOptions ).subscribe((data: any) => {
        this.inputData = data;
        processInputData(this.inputData);
        console.clear();
      });
    }

    console.log(this.inputData)

    const processInputData = (inputData: any) => {
      const groupedData: any = {};
      for (const record of inputData.RECORDS) {
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
            if (record.code === '1') {
              item.eventColor = "red";
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

      this.resourcesArray = [];
      this.eventArray = [];
      this.assignmentsArray = [];

      for (const job in groupedData) {
        if (groupedData.hasOwnProperty(job)) {
          const jobData = groupedData[job];

          if (jobData && jobData.length > 0) {
            this.resourcesArray.push({
              id: job,
              name: job
            });

            for (const item of jobData) {
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

      scheduler.resources = this.resourcesArray;
      scheduler.events = this.eventArray;
      scheduler.assignments = this.assignmentsArray;
    }

    const datePicker = new DatePicker({
      appendTo: document.body,
      width: '24em',
      date: new Date(),
      onSelectionChange: ({ selection }: { selection: any }) => {
        const selectedDate = selection[0];
        this.moment = DateHelper.format(selectedDate, 'YYYY-MM-DD');
        requestDataPost(this.moment);
        scheduler.setStartDate(selectedDate);
        scheduler.refreshRows();
      }
    });

    const scheduler = new SchedulerPro({
      appendTo: document.body,
      autoHeight: true,
      startDate: this.dateToday,
      endDate: this.dateTomorrow,
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
