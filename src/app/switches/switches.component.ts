import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../api-service.service";

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.scss']
})
export class SwitchesComponent implements OnInit, OnDestroy {

  rows: any;
  config: any;
  switchesSubscription: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getSwitches().subscribe(
      (value: any) => {
        this.rows = value;
        console.log(value);
      }
    );
  }

  ngOnDestroy(): void {
  }

}
