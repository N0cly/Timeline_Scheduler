import {Component, Output} from '@angular/core';

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
  dateToday = `${this.year}-${this.month}-${this.day}`;

  @Output() selectedDate:Date = this.dateTest;
  @Output() moment: string = this.dateToday;

  constructor() {

  }


  onDateSelected(selectedDate: Date) {
    this.selectedDate = selectedDate;
  }

  onMoment(moment: string) {
    this.moment = moment;
  }
}
