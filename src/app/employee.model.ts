export type EmployeeStatus='ACTIVE'|'INACTIVE';
export interface Employee {
 id:number; employeeCode:string; firstName:string; lastName:string; email:string; phone:string;
 department:string; designation:string; salary:number; joiningDate:string; status:EmployeeStatus;
}
export type EmployeePayload=Omit<Employee,'id'>;
export interface DashboardStats {
 totalEmployees:number; activeEmployees:number; inactiveEmployees:number; departmentCount:number;
 averageSalary:number; departmentBreakdown:Record<string,number>;
}
