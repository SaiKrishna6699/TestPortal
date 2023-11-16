import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { LoginServiceService } from 'src/app/services/login/login-service.service';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, 
})
export class LoginComponent implements OnInit {

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
    this.login.validateUser(email, password)
      .subscribe(isValid => {
        if (isValid) {
          console.log('User logged in');
          this.router.navigateByUrl('/user/dashboard')
          this.cdr.detectChanges()
        } else {
          console.error('Invalid username or password');
          this.dialog.openDialog("Invalid Email Id or Password");
        }
      });
  }
}
