import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {DatePicker, DateHelper, SchedulerPro} from "@bryntum/schedulerpro";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    inputData: any;
    eventArray: any[] = [];
    resourcesArray: any[] = [];
    assignmentsArray: any[] = [];
    selectedDate: string = '';

    dateTest = new Date();
    year = this.dateTest.getFullYear();
    month = this.dateTest.getMonth() + 1;
    day = this.dateTest.getDate();
    day1 = this.dateTest.getDate() + 1;

    dateToday = `${this.year}-${this.month}-${this.day}`;
    dateTomorrow = `${this.year}-${this.month}-${this.day1}`;
    moment: string = this.dateToday;

    constructor(private http: HttpClient) {
        this.setupScheduler();
    }

    setupScheduler() {
        const schedulerContainer = document.getElementById('scheduler-container');
        if (schedulerContainer) {
            const scheduler = new SchedulerPro({
                appendTo: schedulerContainer,
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
                assignments: this.assignmentsArray            });
        }
        this.setupDatePicker(this.moment);
        this.loadData(this.moment);
    }

    refreshScheduler(){
      this.setupScheduler();
    }

    setupDatePicker(initialDate: string) {
        const datePickerContainer = document.getElementById('datepicker-container');
        if (datePickerContainer) {
            const datePicker = new DatePicker({
                appendTo: datePickerContainer,
                width: '24em',
                date: new Date(initialDate),
                onSelectionChange: ({ selection }: { selection: any }) => {
                    const selectedDate = selection[0];
                    this.selectedDate = DateHelper.format(selectedDate, 'YYYY-MM-DD');
                    this.loadData(this.selectedDate);
                }
            });
        }
    }


    loadData(date: string) {
        this.requestDataPost(date);
    }

    requestDataPost(moment: string) {
        console.log('Date envoyée :', moment);

        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };

        const url = 'http://localhost:8000/api/job/planning/post';
        const data = { "moment": moment };

        this.http.post<any>(url, data, httpOptions).subscribe((response: any) => {
            this.inputData = response;
            this.processInputData(this.inputData);
        });
    }

     processInputData = (inputData: any) => {
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

        const ResourcesArray: any[] = [];
        const EventArray: any[] = [];
        const AssignmentsArray: any[] = [];

        for (const job in groupedData) {
            if (groupedData.hasOwnProperty(job)) {
                ResourcesArray.push({
                    id: job,
                    name: job,
                });

                for (const item of groupedData[job]) {
                    EventArray.push({
                        id: item.id,
                        name: item.name,
                        startDate: item.startDate,
                        endDate: item.endDate,
                        eventColor: item.eventColor,
                    });

                    AssignmentsArray.push({
                        event: item.id,
                        resource: job,
                    });
                }
            }
        }

        this.resourcesArray = ResourcesArray;
         this.eventArray = EventArray;
         this.assignmentsArray = AssignmentsArray;

         // this.refreshScheduler()

    }

    onDateSelected(selectedDate: string) {
        this.selectedDate = selectedDate;
        this.loadData(selectedDate)
        this.refreshScheduler()
    }
}
