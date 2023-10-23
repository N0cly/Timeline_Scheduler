import {Component, Input} from '@angular/core';
import {SchedulerPro} from "@bryntum/schedulerpro";

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})

@Input() selectedDat: string;

export class SchedulerComponent {

  constructor() {
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
