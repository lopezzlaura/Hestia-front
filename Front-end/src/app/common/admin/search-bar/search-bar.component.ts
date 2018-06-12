import { Component, OnInit, EventEmitter } from '@angular/core';
import {MaterializeDirective, MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  modalActions = new EventEmitter<string|MaterializeAction>();
  constructor() { }

  ngOnInit() { }
  private addMember(): void {
    this.modalActions.emit({action: 'modal', params: ['open']});
    console.log('Add member clicked');
  }

  private closeModal(): void {
    this.modalActions.emit({action: 'modal', params: ['close']});
    console.log('Close dialog clicked');
  }
}
