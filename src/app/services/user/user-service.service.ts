// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }

  private userData: any;

  setUser(data: { email: string; name: string; mobileNumber: string }) {
    this.userData = data;
  }

  getUser() {
    return this.userData;
  }

  private adminData: any;

  setAdmin(data: { username: string, name: string }) {
    this.adminData = data;
  }

  getAdmin() {
    return this.adminData;
  }
}
