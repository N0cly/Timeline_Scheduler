import {Component, ElementRef, Output, Renderer2} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    dateTest = new Date();
    year = this.dateTest.getFullYear();
    month = this.dateTest.getMonth() + 1;
    day = this.dateTest.getDate();
    day1 = this.dateTest.getDate() + 1;
    dateToday = `${this.year}-${this.month}-${this.day}`;

    @Output() selectedDate:Date = this.dateTest;
    @Output() moment: string = this.dateToday;
    isCheckboxChecked = false; // Propriété pour stocker l'état de la case à cocher

    constructor(private renderer:Renderer2, private el:ElementRef) {

        if (this.isCheckboxChecked){
            const element = this.el.nativeElement.querySelector('#b-datepicker-1');

            if (element) {
                this.renderer.setStyle(element, 'color', 'red');
            }
        }

    }


    onDateSelected(selectedDate: Date) {
        this.selectedDate = selectedDate;
    }

    onMoment(moment: string) {
        this.moment = moment;
    }
}
