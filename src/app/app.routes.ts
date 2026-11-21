import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeFormComponent } from './employee-form.component';
export const routes: Routes = [
 {path:'',component:DashboardComponent},
 {path:'employees',component:EmployeeListComponent},
 {path:'employees/new',component:EmployeeFormComponent},
 {path:'employees/:id/edit',component:EmployeeFormComponent},
 {path:'**',redirectTo:''}
];
