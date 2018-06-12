import { Component, OnInit } from '@angular/core';
import {HistoryModel} from "../../../../shared/models/HistoryModel";
import {HistoryService} from "../../../../shared/services/history.service";
import {Observable} from "rxjs/Observable";
import {md5} from "../../../../shared/utils/md5";
import {forkJoin} from "rxjs/observable/forkJoin";
import { Router } from '@angular/router';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

    histories: Observable<HistoryModel[]>;
    hashs: { [email: string] : string;} = {};

  constructor(private historyService: HistoryService, private router: Router) { }

  ngOnInit() {
      this.histories = this.historyService.getHistories();

      forkJoin([this.histories]).subscribe(result => {
          this.histories.subscribe(array => array.forEach(value => {
              this.hashs[value.member.email] = md5(value.member.email);
          }));
      });
  }
    btnClick() {
        this.router.navigateByUrl('/home/visuIncidents');
    };
}
