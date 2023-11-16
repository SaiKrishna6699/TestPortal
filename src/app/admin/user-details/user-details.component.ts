import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { ResultsService } from 'src/app/services/results/results.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private usersService: ResultsService, private dialog: DialogService,) { }

  userForm!: FormGroup;

  pressedUser: boolean = false;

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe(
      (u) => {
        console.log("User Details", u);
        this.users = u;
      },
      (err) => {
        console.log("Error Occured while fetching Users")
      }
    );

    this.userForm = this.formBuilder.group({
      name: [{ value: '', disabled: !this.isEditMode }, Validators.required],
      email: [{ value: '', disabled: !this.isEditMode }, [Validators.required, Validators.email]],
      password: [{ value: '', disabled: !this.isEditMode }],
      confirmPassword: [{ value: '', disabled: !this.isEditMode }],
      mobileNumber: [{ value: '', disabled: !this.isEditMode }],
      gender: [{ value: '', disabled: !this.isEditMode }],
    });
  }

  users: any[] = [];

  // Initialize the passwordVisibility array with false for all users
  passwordVisibility: boolean = true;

  togglePasswordVisibility(): void {
    this.passwordVisibility = !this.passwordVisibility;
  }

  selectedUser: any;
  isEditMode: boolean = false;
  updateButtonText: string = 'Update';

  showUserDetails(user: any): void {
    this.selectedUser = user;
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    this.updateButtonText = this.isEditMode ? 'Confirm' : 'Update';

    if (this.userForm) {
      const nameControl = this.userForm.get('name');
      if (nameControl) {
        nameControl.disabled ? nameControl.enable() : nameControl.disable();
      }
      const emailControl = this.userForm.get('email');
      if (emailControl) {
        emailControl.disabled ? emailControl.enable() : emailControl.disable();
      }

      const passwordControl = this.userForm.get('password');
      const confirmPasswordControl = this.userForm.get('confirmPassword');
      const mobileNumberControl = this.userForm.get('mobileNumber');
      const genderControl = this.userForm.get('gender');

      if (passwordControl) {
        passwordControl.disabled ? passwordControl.enable() : passwordControl.disable();
      }

      if (confirmPasswordControl) {
        confirmPasswordControl.disabled ? confirmPasswordControl.enable() : confirmPasswordControl.disable();
      }

      if (mobileNumberControl) {
        mobileNumberControl.disabled ? mobileNumberControl.enable() : mobileNumberControl.disable();
      }

      if (genderControl) {
        genderControl.disabled ? genderControl.enable() : genderControl.disable();
      }
    }

  }

  // updateUser(formData: any): void {
  //   const name = this.userForm.value.name;
  //   const email = this.userForm.value.email;
  //   const password = this.userForm.value.password;
  //   const confirmPassword = this.userForm.value.confirmPassword;
  //   const gender = this.userForm.value.gender;
  //   const mobileNumber = this.userForm.value.mobileNumber;

  //   const user = [name, email, password, confirmPassword, mobileNumber, gender]
  //   if (this.isEditMode) {
  //     console.log('Update user:', formData.value);
  //     this.usersService.updateUserbyEmail(this.selectedUser.email, user);
  //     this.toggleEditMode();
  //   } else {
  //     this.toggleEditMode();
  //   }
  // }

  // deleteUser(formData: any): void {
  //   console.log("email from Delete button",formData.value.email);
  //   this.usersService.deleteByEmail(formData.value.email).subscribe(
  //     (data) => {
  //       console.log("User Deleted Successfully");
  //       this.dialog.openDialog(`User ${this.selectedUser.name} details got deleted succesfully`);
  //       this.ngOnInit();
  //     },
  //     (err) => {
  //       console.log("Error while deleting user.")
  //       this.dialog.openDialog(`Error while deleting User ${this.selectedUser.name}`);
  //       this.ngOnInit();
  //     }
  //   )
  // }

  deleteButtonText: string = 'Delete';
  isConfirmDelete: boolean = false;
  isDeletable: boolean = false;

  toggleDeleteMode(): void {
    this.isDeletable = !this.isDeletable;
    this.deleteButtonText = this.isDeletable ? 'Confirm' : 'Delete';
  }

  deleteUser(formData: any): void {
    console.log("Delete Button")
    console.log("email", formData.value.email);
    if (this.isDeletable && this.isConfirmDelete && formData.value.email) {
      const emailToDelete = formData.value.email;
      console.log(emailToDelete, "Email to Delete");

      this.usersService.deleteByEmail(emailToDelete).subscribe(
        () => {
          console.log('User Deleted Successfully');
          this.dialog.openDialog(`User ${this.selectedUser.name} details got deleted successfully`);
          this.ngOnInit();
          this.pressedUser = false;
        },
        (err) => {
          console.log('Error while deleting user.');
          this.dialog.openDialog(`Error while deleting User ${this.selectedUser.name}`);
          this.ngOnInit();
          this.pressedUser = false;
        }
      );
      this.toggleDeleteMode();
      // this.isConfirmDelete = false;
    } else {
      this.isConfirmDelete = true;
      this.toggleDeleteMode();
    }
  }


  updateUser(formData: any): void {
    if (this.isEditMode) {
      console.log('Update user:', formData);
      this.usersService.updateUserbyEmail(this.selectedUser.email, formData).subscribe(
        (data) => {
          console.log("User Updated Successfully");
          this.ngOnInit();
          this.selectUser;
          this.dialog.openDialog(`User ${this.selectedUser.name} details got updated succesfully`);
          this.pressedUser = false;
        },
        (err) => {
          console.log("Error while updating user");
          this.dialog.openDialog(`Error while updating User ${this.selectUser.name}.`);
          this.ngOnInit();
        }
      );
      this.toggleEditMode();
    } else {
      this.toggleEditMode();
    }
  }

  selectUser(user: any): void {
    this.selectedUser = { ...user };
    this.pressedUser = true;
    console.log("select", this.selectedUser);
    this.userForm.setValue({
      name: user.name,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      mobileNumber: user.mobileNumber,
      gender: user.gender,
    });
    console.log('User Form from selectUser', this.userForm.value)
  }
}
