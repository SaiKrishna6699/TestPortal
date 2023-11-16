import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicDialogBoxComponent } from 'src/app/dynamic-dialog-box/dynamic-dialog-box.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(message: string): void {
    const dialogRef = this.dialog.open(DynamicDialogBoxComponent, {
      width: '30vw',
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
    });
  }
}
