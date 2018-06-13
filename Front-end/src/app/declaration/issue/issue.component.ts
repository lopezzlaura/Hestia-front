import {Component, Input, OnInit} from "@angular/core";
import {IssueModel} from '../../../shared/models/IssueModel';
import {MatDialog} from '@angular/material/dialog';
import {DialogOverviewComponent} from "./dialog-overview.component";

@Component({
    selector: 'app-issue',
    templateUrl: './issue.component.html',
    styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

    @Input() issueElement: IssueModel;
    @Input() canEdit: boolean;

    constructor(private dialog: MatDialog) {
    }

    ngOnInit() {
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogOverviewComponent, {
            width: '550px',
            data: {
                id : this.issueElement.id,
                title: this.issueElement.title,
                image: this.issueElement.getImg(),
                description: this.issueElement.description,
                emergency: this.issueElement.emergency,
                lieu: this.issueElement.location,
                thirdParty: this.issueElement.thirdParty?this.issueElement.thirdParty.firstname + " " + this.issueElement.thirdParty.lastname:"Aucune personne désignée",
                type: this.issueElement.type.name,
                state: this.issueElement.state.name,
                date: this.issueElement.date,
                time: this.issueElement.time,
                author: this.issueElement.author.firstname + " " + this.issueElement.author.lastname,
                canEdit: this.canEdit,
                assignMember: this.issueElement.assignMember
            }
        });
    }

}