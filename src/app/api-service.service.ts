import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {observable, Observable, Subject, throwError} from "rxjs";
import {catchError, map, subscribeOn} from "rxjs/operators";
import {flatMap} from "rxjs/internal/operators";
import {DeviceFactory} from "./switches/model/device-factory";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string = 'http://192.168.254.9/api/'; // @todo apiurl to env
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options = {headers: this.headers, withCredentials: false}

  constructor(private httpClient: HttpClient) { }

  getSwitches(): Observable<any> {
    let subject = new Subject();
    this.getConfig().subscribe(
      (config: any) => {
        this.httpClient.get(this.apiUrl + 'switch', this.options).pipe(
          catchError(this.handleError),
          map((switches: any) => switches['_embedded'])
        ).subscribe(
          (switches: any) => subject.next(this.combineSwitchesWithConfig(switches, config))
        )
      }
    );

    return subject;
  }

  private getConfig(): Observable<any> {
    return this.httpClient.get(this.apiUrl + 'front-config', this.options).pipe(
      map((result: any) => result['devices'])
    )
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

  private combineSwitchesWithConfig(switches: any, config: any) {
    return config.map((row: any) => {
      row.items = row.items.map((item: any) => DeviceFactory.create(switches[item]))
      return row;
    });
  }
}
