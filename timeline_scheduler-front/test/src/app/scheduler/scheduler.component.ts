import { Component, Input } from '@angular/core';
import { SchedulerPro } from "@bryntum/schedulerpro";

@Component({
    selector: 'app-scheduler',
    templateUrl: './scheduler.component.html',
    styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent {


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
    @Input() selectedDate: string = '';

    constructor() {
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
                assignments: this.assignmentsArray        });
        }
    }
}
