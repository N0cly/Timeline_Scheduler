import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BryntumSchedulerProModule } from '@bryntum/schedulerpro-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { DatepickerComponent } from './datepicker/datepicker.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import {FormsModule} from "@angular/forms";
import { Chart100Component } from './chart100/chart100.component';
import {NgApexchartsModule} from "ng-apexcharts";

@NgModule({
  declarations: [
    AppComponent,
    DatepickerComponent,
    SchedulerComponent,
    Chart100Component,

  ],
  imports: [
    BrowserModule,
    BryntumSchedulerProModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgApexchartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
