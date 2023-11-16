import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { LoginServiceService } from 'src/app/services/login/login-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  passwordReset!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private login: LoginServiceService, private dialog: DialogService) { }

  ngOnInit(): void {
    this.passwordReset = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.passwordReset.valid) {
      const email = this.passwordReset.value.email;
      const newPassword = this.passwordReset.value.password;
      const newConfirmPassword = this.passwordReset.value.confirmPassword;

      this.login.resetPassword(email, newPassword, newConfirmPassword)
        .subscribe(success => {
          if (success) {
            console.log('Password reset successful!');
            this.dialog.openDialog("Password changed successfully");
          } else {
            console.error('Invalid user or password mismatch');
            this.dialog.openDialog("Invalid user or password mismatch")
          }
        });
    }
  }



}
