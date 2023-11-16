import { AfterContentChecked, AfterContentInit, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LoginServiceService } from '../services/login/login-service.service';
import { Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Use OnPush change detection strategy
})
export class HeaderComponent implements OnInit, AfterContentChecked {

  constructor(
    private loginService: LoginServiceService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  isLoggedin = false;
  isAdmin: boolean = false;
  username = "";
  isNavActive = false;
  isMenuActive = false;

  ngOnInit(): void {
    const userDetails = this.loginService.getUserDetailsFromSessionStorage();
    const adminDetails = this.loginService.getAdminDetailsFromSessionStorage();

    if (userDetails || adminDetails) {
      const details = userDetails || adminDetails;
      console.log("userdetails", userDetails);
      console.log("admindetails", adminDetails);
      console.log("details", details)
      if (details.username) {
        console.log("1");
        this.loginService.setUserOrAdmin(details);
        this.username = details.name
        this.isAdmin = true;
        this.loginService.isLoggedInSubject.next(true);
        this.loginService.isLoggedIn$.subscribe(isLoggedIn => {
          this.isLoggedin = isLoggedIn;
          this.isAdmin = true;
        });
        this.cdr.detectChanges();
      } else if (details.email !== null) {
        console.log("2")
        this.loginService.setUserOrAdmin(details);
        this.username = details.name;
        this.isLoggedin = true;
        this.loginService.isLoggedInSubject.next(true);
        this.loginService.isLoggedIn$.subscribe(isLoggedIn => {
          this.isLoggedin = isLoggedIn;
        });
        this.cdr.detectChanges();
      }
    }
  }

  ngAfterContentChecked(): void {
    this.ngOnInit();
  }

  logout() {
    this.isLoggedin = false;
    this.isAdmin = false;
    this.loginService.logoutUser();
    this.router.navigate(['/home']);
    this.loginService.isLoggedInSubject.next(false);
    this.cdr.detectChanges();
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const screenWidth = window.innerWidth;
    this.isMenuActive = screenWidth < 770;
  }
}
