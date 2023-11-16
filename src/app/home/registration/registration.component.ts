import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DynamicDialogBoxComponent } from 'src/app/dynamic-dialog-box/dynamic-dialog-box.component';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { LoginServiceService } from 'src/app/services/login/login-service.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private route: Router, private register: LoginServiceService, private dialog: DialogService) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      gender: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      termsAndConditions: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      const { email, password, name } = this.registrationForm.value;

      this.register.register(formData)
        .subscribe(
          () => {
            console.log('Form data stored successfully');
            this.dialog.openDialog(`User Registered Successfully with username ${email} and password ${password}`);
          },
          (error) => {
            console.error('Error storing form data:', error);
            this.dialog.openDialog(`Error while creating user ${name}`);
          }
        );
    }
  }





}
