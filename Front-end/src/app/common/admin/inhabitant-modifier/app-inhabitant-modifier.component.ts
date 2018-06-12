import {PasswordGenerator} from "./../../../../shared/utils/password.generator";
import {AdminService} from "../../../../shared/services/admin.service";
import {InhabitantModel} from "../../../../shared/models/InhabitantModel";
import {Component, OnInit, EventEmitter, Output, Input} from "@angular/core";

@Component({
    selector: "app-inhabitant-modifier",
    templateUrl: "./app-inhabitant-modifier.component.html",
    styleUrls: ["./app-inhabitant-modifier.component.css"]
})
export class InhabitantModifierComponent implements OnInit {

    @Input() inhabitant: InhabitantModel;
    @Output() closeEvent = new EventEmitter();


    nameInputValue: string;
    firstNameInputValue: string;
    emailInputValue: string;


    constructor(private adminService: AdminService, private passwordgenerator: PasswordGenerator) {
    }

    ngOnInit() {
        if (this.inhabitant != null) {
            this.nameInputValue = this.inhabitant.lastname;
            this.firstNameInputValue = this.inhabitant.firstname;
            this.emailInputValue = this.inhabitant.email;
        }
        console.log(this.adminService.getMemberCount());
    }

    private validDialog() {
        if (this.inhabitant != null) {
            this.inhabitant.firstname = this.firstNameInputValue;
            this.inhabitant.lastname = this.nameInputValue;
            this.inhabitant.email = this.emailInputValue;
            this.adminService.patchMember(this.inhabitant);
            this.adminService.getMembers();
            this.closeEvent.emit("close-dialog");
            console.log("patched member");
        } else {
            // TODO send verification email and make it work
            const newInhabitant = new InhabitantModel(this.adminService.getMemberCount() + 1,
                this.nameInputValue, this.firstNameInputValue, null, this.emailInputValue,
                false, this.passwordgenerator.generate());
            this.adminService.postMember(newInhabitant);
            this.adminService.getMembers();
            this.closeEvent.emit("close-dialog");
            console.log("posted member");
        }
        console.log("Valid dialog clicked");
    }


    private closeDialog(): any {
        this.closeEvent.emit("close-dialog");
        console.log("close dialog clicked");
    }


}
