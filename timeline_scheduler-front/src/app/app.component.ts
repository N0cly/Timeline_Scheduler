import { Component } from '@angular/core';
import { SchedulerPro, DatePicker, DateHelper } from "@bryntum/schedulerpro";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-compenent',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  inputData: any;
  eventArray: any[] = [];
  resourcesArray: any[] = [];
  assignmentsArray: any[] = [];

  dateTest = new Date()
  year = this.dateTest.getFullYear()
  month = this.dateTest.getMonth()+1
  day = this.dateTest.getDate()
  day1 = this.dateTest.getDate()+1

  dateToday = `${this.year}-${this.month}-${this.day}`
  dateTomorrow = `${this.year}-${this.month}-${this.day1}`
  moment: string = this.dateToday;

  constructor(private http: HttpClient) {


    const  requestData = (moment: string)=> {
      let url = `http://localhost:8000/api/job/planning/get/${moment}`;
      http.get(url).subscribe((data: any) => {
        // console.log(data);
        // Mettez à jour les données
        this.inputData = data;
        processInputData(data);
        console.log("------GET------")
        console.log(data)
        console.log("------------")

      });
    }
    const requestDataPost = (moment: string) => {
      // Avant d'envoyer la requête, affichez la date dans la console
      console.log('Date envoyée :', moment);

      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      };

      const url = 'http://localhost:8000/api/job/planning/post';
      const data = { "moment":moment };

      this.http.post<any>(url, data, httpOptions).subscribe((response: any) => {
        this.inputData = response;
        console.log("------POST------")
        console.log(response)
        console.log("------------")
        processInputData(this.inputData);

        requestData(moment)


        // console.clear();
      });
    }

    console.log(this.inputData)
    requestData(this.moment);



    const processInputData = (inputData: any) => {
      const groupedData: any = {};

      inputData.RECORDS.forEach((record: any) => {
        const job = record.job;

        if (!groupedData[job]) {
          groupedData[job] = [
            {
              id: record.id,
              name: record.father_pid,
              startDate: record.moment,
              endDate: record.moment,
              eventColor: Number(record.code) === 0 ? 'green' : 'red',
            },
          ];
        } else {
          let found = false;

          for (const item of groupedData[job]) {
            if (item.name === record.father_pid) {
              item.endDate = record.moment;
              if (Number(record.code) === 1) {
                item.eventColor = 'red';
              }
              found = true;
              break;
            }
          }

          if (!found) {
            groupedData[job].push({
              id: record.id,
              name: record.father_pid,
              startDate: record.moment,
              endDate: record.moment,
              eventColor: Number(record.code) === 0 ? 'green' : 'red',
            });
          }
        }
      });

      const resourcesArray: any[] = [];
      const eventArray: any[] = [];
      const assignmentsArray: any[] = [];

      for (const job in groupedData) {
        if (groupedData.hasOwnProperty(job)) {
          resourcesArray.push({
            id: job,
            name: job,
          });

          for (const item of groupedData[job]) {
            eventArray.push({
              id: item.id,
              name: item.name,
              startDate: item.startDate,
              endDate: item.endDate,
              eventColor: item.eventColor,
            });

            assignmentsArray.push({
              event: item.id,
              resource: job,
            });
          }
        }
      }

      scheduler.resources = resourcesArray;
      scheduler.events = eventArray;
      scheduler.assignments = assignmentsArray;

    }

    const datePicker = new DatePicker({
      appendTo: document.body,
      width: '24em',
      date: new Date(),
      onSelectionChange: ({ selection }: { selection: any }) => {
        const selectedDate = selection[0];
        this.moment = DateHelper.format(selectedDate, 'YYYY-MM-DD');
        requestData(this.moment);
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
