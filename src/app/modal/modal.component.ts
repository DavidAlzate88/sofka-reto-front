import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface DialogData {
  title: string;
  msg: string;
  data?: any;
  cancel?: boolean
  errors?: any;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  title: string;
  msg: string;
  errors: any;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.title = data.title;
    this.msg = data.msg;
    this.errors = data.errors;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
