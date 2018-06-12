import {InhabitantModel} from "../../../../shared/models/InhabitantModel";
import {Component, OnInit} from "@angular/core";
import {InhabitantService} from "../../../../shared/services/inhabitant.service";


@Component({
  selector: "app-inhabitants",
  templateUrl: "./app-inhabitants.component.html",
  styleUrls: ["./app-inhabitants.component.css"]
})
export class InhabitantsComponent implements OnInit {

  public inhabitantList: InhabitantModel[];

  constructor(private inhabitantService: InhabitantService) {
   }

  ngOnInit() {
  }

}
