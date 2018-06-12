import {MaterializeAction} from "angular2-materialize";
import {InhabitantModel} from "../../../../shared/models/InhabitantModel";
import {Component, EventEmitter, Input, OnInit} from "@angular/core";
import {InhabitantService} from "../../../../shared/services/inhabitant.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-inhabitant",
  templateUrl: "./app-inhabitant.component.html",
  styleUrls: ["./app-inhabitant.component.css"]
})
export class InhabitantComponent implements OnInit {

  @Input() inhabitantElement: InhabitantModel;

  modalAddMemberActions = new EventEmitter<string | MaterializeAction>();
  modalSuppressActions = new EventEmitter<string | MaterializeAction>();

  constructor(private inhabitantService: InhabitantService, private router: Router) {
    this.inhabitantElement = new InhabitantModel(1);
  }

  ngOnInit() {
  }


  private opentModifyInhabitantModal(): void {
    console.log("modify inhabitant clicked");
    this.modalAddMemberActions.emit({action: "modal", params: ["open"]});
  }

  private closeAddMemberModal(): void {
    this.modalAddMemberActions.emit({action: "modal", params: ["close"]});
  }


  private deleteInhabitant(): void {
    this.inhabitantService.deleteMember(this.inhabitantElement.id)
    this.router.navigate(["/home/admin/members"]);
    console.log("delete inhabitant clicked");
  }
}
