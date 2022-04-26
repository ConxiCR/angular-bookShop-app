import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


interface DialogData {
    title: string;
    message: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})

export class ConfirmDialogComponent {

    public title: string;
    public message: string;

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}


    public onConfirm(): void {
        this.dialogRef.close(true);
    }

    public onDismiss(): void {
        this.dialogRef.close(false);
    }

}
