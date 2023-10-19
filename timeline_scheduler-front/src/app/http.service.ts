import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }
  getData(moment:string)  {
    this.http.get(`http://localhost:8000/api/job?moment=${moment}`).subscribe(data => {
        return data;
      }
    )
  }
}
