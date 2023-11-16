import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { LoginServiceService } from 'src/app/services/login/login-service.service';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private login: LoginServiceService, private dialog: DialogService, private user: UserServiceService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      console.log(email, password)
      this.loginUser(email, password);
    }
  }

  loginUser(email: string, password: string): void {
    this.login.adminLogin(email, password)
      .subscribe(isValid => {
        if (isValid) {
          console.log('Admin logged in');
          this.router.navigateByUrl('/admin/adminhome');
          this.cdr.detectChanges();
        } else {
          console.error('Invalid username or password');
          this.dialog.openDialog("Invalid Email Id or Password");
        }
      });
  }

}
