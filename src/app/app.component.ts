import { Component, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from './service/shared.service';
import { Payslip } from './model/payslip.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('fileUpload') imgUpload: ElementRef;
  title = 'Pay Slip Generator';
  payslips: Array<Payslip>;
  files: FileList;
  selectedFile: File;
  constructor(private sharedService: SharedService) {
    this.payslips = new Array<Payslip>();
  }

  downloadAll() {
    this.sharedService.downloadAll(this.payslips);
  }

  selectFile(files: FileList) {
    this.files = files;
    if (files && files.length > 0) {
      this.selectedFile = files.item(0);
      this.imgUpload.nativeElement.value = "";
      if (this.selectedFile.name.indexOf('.csv') > -1) {
        const reader: FileReader = new FileReader();
        reader.readAsText(this.selectedFile);
        reader.onload = (e) => {
          const csv: string = reader.result as string;
          let jso = <Array<Payslip>>JSON.parse(this.sharedService.csvJSON(csv));
          jso = jso.filter(x => x.SalarySlip !== '');
          this.payslips = jso;
          console.log(this.payslips);
          if (this.payslips && this.payslips.length) {
            this.payslips.forEach(c => {
              c.company = this.sharedService.getCompanyList().find(
                v => v.name.toLowerCase() === c.CompanyName.toLowerCase());
              c.isParentCompany = c.company.name.toLowerCase() === 'radiance' ? true : false;
              c.isEmpOnProbation = c.OnProbation && c.OnProbation.toLowerCase() === 'yes' ? true : false;
            });
          }
        };
      } else {
        alert(`Not a valid csv`);
      }
    }
  }

  downloadPdf(index) {
    this.sharedService.downloadAll(this.payslips, true, index);
  }
}
