import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestComponent } from './test/test.component';
import { AuthGuard } from '../guards/auth.guard';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
  { path: 'test', canActivate: [AuthGuard], component: TestComponent },
  { path: 'results', canActivate: [AuthGuard], component: ResultsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
