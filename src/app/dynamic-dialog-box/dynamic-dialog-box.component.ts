import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dynamic-dialog-box',
  templateUrl: './dynamic-dialog-box.component.html',
  styleUrls: ['./dynamic-dialog-box.component.scss']
})
export class DynamicDialogBoxComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DynamicDialogBoxComponent>) { }

  message: string = this.data.message;

  closeIcon: any = faClose;

  closeDialog(): void {
    this.dialogRef.close();
  }

}
