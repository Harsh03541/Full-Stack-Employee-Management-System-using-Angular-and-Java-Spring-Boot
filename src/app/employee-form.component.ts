import { Component,OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,ReactiveFormsModule,Validators } from '@angular/forms';
import { ActivatedRoute,Router,RouterLink } from '@angular/router';
import { EmployeeService } from './employee.service';
import { EmployeePayload,EmployeeStatus } from './employee.model';
@Component({
 selector:'app-employee-form',standalone:true,imports:[CommonModule,ReactiveFormsModule,RouterLink],
 template:`
 <div class="heading"><div><label>PEOPLE DIRECTORY</label><h1>{{edit?'Edit employee':'Add employee'}}</h1><p>{{edit?'Update employee information.':'Add a new member to your organization.'}}</p></div><a routerLink="/employees">← Back to employees</a></div>
 @if(error){<div class="error">{{error}}</div>}
 <form class="panel form" [formGroup]="form" (ngSubmit)="save()">
  <h2>Personal information</h2><p class="muted">Basic details about the employee</p>
  <div class="fields">
   <label>Employee ID *<input formControlName="employeeCode" placeholder="EMP-1007"><small *ngIf="bad('employeeCode')">Employee ID is required.</small></label>
   <label>First name *<input formControlName="firstName" placeholder="First name"><small *ngIf="bad('firstName')">First name is required.</small></label>
   <label>Last name *<input formControlName="lastName" placeholder="Last name"><small *ngIf="bad('lastName')">Last name is required.</small></label>
   <label>Email address *<input type="email" formControlName="email" placeholder="name@company.com"><small *ngIf="bad('email')">Enter a valid email.</small></label>
   <label>Phone number<input formControlName="phone" placeholder="+91 98765 43210"></label>
  </div>
  <hr><h2>Work information</h2><p class="muted">Role, department and compensation</p>
  <div class="fields">
   <label>Department *<select formControlName="department"><option value="">Select department</option>@for(d of departments;track d){<option>{{d}}</option>}</select><small *ngIf="bad('department')">Select a department.</small></label>
   <label>Designation *<input formControlName="designation" placeholder="Software Engineer"><small *ngIf="bad('designation')">Designation is required.</small></label>
   <label>Monthly salary (INR) *<input type="number" formControlName="salary" placeholder="50000"><small *ngIf="bad('salary')">Enter salary greater than zero.</small></label>
   <label>Joining date *<input type="date" formControlName="joiningDate"><small *ngIf="bad('joiningDate')">Select a joining date.</small></label>
   <label>Status *<select formControlName="status"><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option></select></label>
  </div>
  <div class="form-actions"><a routerLink="/employees">Cancel</a><button class="primary" type="submit" [disabled]="saving">{{saving?'Saving...':(edit?'Save changes':'Create employee')}}</button></div>
 </form>`
})
export class EmployeeFormComponent implements OnInit {
 private fb=inject(FormBuilder);private service=inject(EmployeeService);private route=inject(ActivatedRoute);private router=inject(Router);
 departments=['Engineering','Human Resources','Finance','Marketing','Operations','Sales','Design'];
 form=this.fb.group({
  employeeCode:['',[Validators.required,Validators.maxLength(20)]],firstName:['',Validators.required],lastName:['',Validators.required],
  email:['',[Validators.required,Validators.email]],phone:['',[Validators.pattern(/^[0-9+() -]{7,20}$/)]],
  department:['',Validators.required],designation:['',Validators.required],salary:[null as number|null,[Validators.required,Validators.min(0.01)]],
  joiningDate:['',Validators.required],status:['ACTIVE' as EmployeeStatus,Validators.required]
 });
 edit=false;saving=false;error='';id:number|null=null;
 ngOnInit(){const raw=this.route.snapshot.paramMap.get('id');if(raw){this.edit=true;this.id=Number(raw);this.service.get(this.id).subscribe({next:e=>this.form.patchValue(e),error:()=>this.error='Could not load employee.'});}}
 bad(name:string){const c=this.form.get(name);return !!c&&c.invalid&&(c.touched||c.dirty);}
 save(){this.form.markAllAsTouched();if(this.form.invalid||this.saving)return;this.saving=true;const payload=this.form.getRawValue() as EmployeePayload;
 const req=this.edit&&this.id?this.service.update(this.id,payload):this.service.create(payload);
 req.subscribe({next:()=>this.router.navigate(['/employees']),error:e=>{this.error=e?.error?.message||'Could not save employee. Check the entered details.';this.saving=false;}});
 }
}
