import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Component, Inject} from "@angular/core";

@Component({
    selector: 'dialog-inhabitant',
    templateUrl: 'dialog-inhabitant.html'
})
export class DialogInhabitantComponent {

    constructor(
        public dialogRef: MatDialogRef<DialogInhabitantComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    close() {
        this.dialogRef.close();
    }

}

