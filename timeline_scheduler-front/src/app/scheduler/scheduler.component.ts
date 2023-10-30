import {AfterViewInit, Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {
  AssignmentModel,
  AssignmentStore,
  EventModel,
  EventStore,
  ResourceModel,
  ResourceStore,
  SchedulerPro
} from "@bryntum/schedulerpro";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements AfterViewInit{

  inputData: any;

  resourcesArray: any[] = [];
  eventArray: any[] = [] ;
  assignmentsArray: any[] = [];

  resourceSearch: string = '';

  dateTest = new Date();
  year = this.dateTest.getFullYear();
  month = this.dateTest.getMonth()+1;
  day = this.dateTest.getDate();
  day1 = this.dateTest.getDate()+1;

  dateToday = `${this.year}-${this.month}-${this.day}`;
  dateTomorrow = `${this.year}-${this.month}-${this.day1}`;

  @Input() selectedDate: Date | undefined;
  @Input() moment: string | undefined;

  @Output() data = new EventEmitter<any>();

  scheduler: any;

  groupedData: any = {};

  resourceStore: ResourceStore | any;
  eventStore: EventStore | any;
  assignmentStore: AssignmentStore | any;

  constructor(private http: HttpClient) {

  }

  ngAfterViewInit(): void {

    const schedulerContainer = document.getElementById('scheduler-container');
    if (schedulerContainer) {
      this.scheduler = new SchedulerPro({
        appendTo: schedulerContainer,
        autoHeight: true,
        rowHeight: 20,

        startDate: this.dateToday,
        endDate: this.dateTomorrow,
        viewPreset: 'hourAndDay',
        columns: [
          {
            field: 'name',
            text: 'Name',
            width: 250,
            searchable: true,
          }
        ],


        resources: this.resourcesArray,
        events: this.eventArray,
        assignments: this.assignmentsArray,
      });
      this.resourceStore = this.scheduler.resourceStore;
      this.eventStore = this.scheduler.eventStore;
      this.assignmentStore = this.scheduler.assignmentStore;
    }


  }

  onResourceSearchChange() {
    if (this.resourceSearch != ''){
      this.resourceStore.data = this.resourcesArray.filter((resource: ResourceModel) => {
        return resource.name.toLowerCase().includes(this.resourceSearch.toLowerCase());
      });

    } else {
      this.resourceStore.data = this.resourcesArray;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.selectedDate && this.moment) {
      this.requestDataPost(this.moment);
    }
  }
  requestDataPost = (moment: string) => {
    //console.log('Date envoyée :', moment);

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    const url = 'http://localhost:8000/api/job/planning/post';
    const data = { "moment": moment };


    this.http.post<any>(url, data, httpOptions).subscribe((response: any) => {
      this.inputData = response;
      this.DataScheduler(this.inputData, this.groupedData);
      // this.DataChart(this.groupedData)
    });
  }

  DataScheduler = (inputData: any, groupedData:any) => {
    // console.log(inputData)
    groupedData = {};
    inputData.RECORDS.forEach((record: any) => {
      const job = record.job;

      if (!job.includes("subj")){

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
      }
    });

    console.log('-----dataScheduler-----')
    console.log(Object.keys(groupedData).length);

    const ResourcesArray: any[] = [];
    const EventArray: any[] = [];
    const AssignmentsArray: any[] = [];

    for (const job in groupedData) {
      if (groupedData.hasOwnProperty(job)) {
        const resourceModel = new ResourceModel({
          id: job,
          name: job
        });

        ResourcesArray.push(resourceModel);

        for (const item of groupedData[job]) {
          const eventModel = new EventModel({
            id: item.id, // Assurez-vous que c'est l'ID de l'événement
            name: item.name,
            startDate: item.startDate,
            endDate: item.endDate,
            eventColor: item.eventColor
          });
          EventArray.push(eventModel);

          const assignmentModel = new AssignmentModel({
            event: item.id,
            resource: job
          });
          AssignmentsArray.push(assignmentModel);
        }
      }
    }

    this.resourceStore.sort('name', 'ASC')

    this.resourceStore.data = ResourcesArray;
    this.eventStore.data = EventArray;
    this.assignmentStore.data = AssignmentsArray;


    this.resourcesArray = ResourcesArray;
    this.eventArray = EventArray;
    this.assignmentsArray = AssignmentsArray;

    this.DataChart(groupedData)
    this.scheduler.setStartDate(this.selectedDate)
    this.scheduler.refreshRows()
    // console.log(this.resourcesArray)
  }

  DataChart = (groupedData:any) => {

    let success: any[] = [];
    let error: any[] = [];
    let label: any[] = [];
    let dataChart: any = {};

    for( const job in groupedData){

      let succ = 0;
      let err = 0;

      if (groupedData.hasOwnProperty(job)) {
        label.push(job)

        for (const item in groupedData[job]){
          for (const item of groupedData[job]) {
            if (item.eventColor === 'green'){
              succ += 1;
            } else {
              err += 1;
            }

          }
        }
        success.push(succ);
        error.push(err);
      }
    }

    dataChart['success'] = success;
    dataChart['error'] = error;
    dataChart['label'] = label;

    console.log('-----dataChart-----')
    console.log(dataChart)
    this.data.emit(dataChart)
  }
}
