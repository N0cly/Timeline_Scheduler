import { Component, EventEmitter, Output } from '@angular/core';
import { DateHelper, DatePicker } from "@bryntum/schedulerpro";

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent {
    @Output() dateSelected = new EventEmitter<Date>();
    @Output() moment = new EventEmitter<string>();

    isCheckboxChecked = false; // Propriété pour stocker l'état de la case à cocher

    constructor() {
        this.setupDatePicker();
    }

    setupDatePicker() {
        const datePickerContainer = document.getElementById('datepicker-container');
        if (datePickerContainer) {
            const datePicker = new DatePicker({
                appendTo: datePickerContainer,
                width: '24em',
                date: new Date(),
                onSelectionChange: ({ selection }: { selection: any }) => {
                    const selectedDate = selection[0];
                    const moment = DateHelper.format(selectedDate, 'YYYY-MM-DD');
                    this.dateSelected.emit(selectedDate);
                    this.moment.emit(moment);

                }
            });
        }
    }
}
