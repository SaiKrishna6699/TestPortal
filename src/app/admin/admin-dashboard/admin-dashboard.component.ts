import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { ResultsService } from 'src/app/services/results/results.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private resultsService: ResultsService, private dialog: DialogService) {

  }

  deleteButtonText: string = 'Delete';
  results: any[] = [];

  isDeletable: boolean = false;
  isConfirmDelete: boolean = false;

  ngOnInit(): void {
    this.resultsService.getAllResults().subscribe(
      (data) => {
        this.results = data;
      },
      (err) => {
        console.log("Error while retrieving data")
      }
    )
  }

  toggleDeleteMode(): void {
    this.isDeletable = !this.isDeletable;
    this.deleteButtonText = this.isDeletable ? 'Confirm' : 'Delete';
  }


  deleteResult(score: any) {

    const email = score.email;
    const time = score.time;

    console.log("from delete button", email, time)

    if (this.isDeletable && this.isConfirmDelete) {

      this.resultsService.deleteResult(email, time).subscribe(
        (data) => {
          console.log("Result deleted successfully");
          this.dialog.openDialog(`User ${email} result taken at ${time} is deleted`);
          this.ngOnInit();
        },
        (err)=>{
          this.dialog.openDialog(`Error Occured while deleting user ${email} result taken at ${time}`);
          this.ngOnInit();
        }
      )
      this.toggleDeleteMode();

    }
    else {
      this.isConfirmDelete = true;
      this.toggleDeleteMode();
    }

  }



}
