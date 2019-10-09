export class Payslip {
  SalarySlip: string;
  CompanyName: string;
  EmployeeName: string;
  EmployeeAddress: string;
  EmployeeID: string;
  PayPeriodBeginDate: string;
  PayPeriodEndDate: string;
  Basic: string;
  HRA: string;
  Medical: string;
  Conveyance: string;
  OtherAllowance: string;
  TotalEarnings: string;
  ProfessionalTax: string;
  TDS: string;
  EmployeesContributiontoPF: string;
  EmployeesContributiontoESIC: string;
  TotalDeductions: string;
  EmployersPFContribution: string;
  EmployersESICContribution: string;
  TotalGross: string;
  LessTax: string;
  LessDeductions: string;
  NetPay: string;
  CLU: string;
  SLU: string;
  HLU: string;
  CLB: string;
  SLB: string;
  company: Company;
  isParentCompany: boolean;
  Advance: string;
  LWP: string;
  PNL: string;
  PNLD: string;
  OnProbation: string;
  isEmpOnProbation: boolean;
}

export class Company {
  name: string;
  displayName: string;
  address: string;
  mobileNo: string;
  logo: string;
}



