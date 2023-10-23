import { Component, EventEmitter, Output } from '@angular/core';
import {DateHelper, DatePicker} from "@bryntum/schedulerpro";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent {
  @Output() dateSelected = new EventEmitter<string>();

  // Votre code du DatePicker ici
  constructor() {
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

    const onSelectDate(date: string) {
      this.dateSelected.emit(date)
    }
  }
}
