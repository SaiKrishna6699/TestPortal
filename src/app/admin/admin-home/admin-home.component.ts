import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent {

  constructor(private router: Router) { }

  usersDetails() {
    this.router.navigateByUrl("/admin/users-details");
  }

  userResult() {
    this.router.navigateByUrl('/admin/admin-dashboard');
  }

}
