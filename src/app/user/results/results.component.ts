import { Component, OnInit } from '@angular/core';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { LoginServiceService } from 'src/app/services/login/login-service.service';
import { ResultsService } from 'src/app/services/results/results.service';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  username!: string;
  email!: string;
  isLoggedin: boolean = false;

  results: any[] = [];

  constructor(private userService: UserServiceService, private login: LoginServiceService, private resultser: ResultsService) { }

  ngOnInit(): void {
    const userDetails = this.login.getUserDetailsFromSessionStorage();
    if (userDetails) {
      this.userService.setUser(userDetails);
      this.username = userDetails.name;
      this.email = userDetails.email;
      this.isLoggedin = true;
      this.login.isLoggedInSubject.next(true);

      // Get user's results
      this.resultser.getUserResults(userDetails.email).subscribe(
        (results) => {
          // Handle the results here
          console.log(results);
          this.results = results;
        },
        (err) => {
          console.log(err);
        }
      );
    }

  }
}
