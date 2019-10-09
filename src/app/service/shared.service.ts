import { Injectable } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as jQuery from 'jquery';
import { Payslip, Company } from '../model/payslip.model';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  async downloadAll(payslips: Array<Payslip>, isSingleDownload: boolean = false, index?: number) {
    if (payslips && payslips.length) {
      const elements = jQuery('.container-real');
      if (isSingleDownload) {
        for (let i = 0; i < elements.length; i++) {
          const payslip = payslips[i];
          if (index === i) {
            await this.download(i, payslip);
          }
        }
      } else {
        for (let i = 0; i < elements.length; i++) {
          const payslip = payslips[i];
          await this.download(i, payslip);
        }
      }
    }
  }

  async download(index: number, payslip: Payslip) {
    return new Promise((resolve, reject) => {
      const elements = jQuery('.container-real');
      elements.attr('style', 'display:block');
      const elementJ = jQuery(`#container_${index}`);
      const element = elementJ[0];
      if (element) {
        const data = element;
        html2canvas(data).then(canvas => {
          const contentDataURL = canvas.toDataURL('image/jpeg');
          elements.attr('style', 'display:none');
          // p stands for potrait (Landscape or Portrait ),(mm, cm, in), (A2, A4 etc) A4 size page of PDF
          const pdfObj = new jspdf('p', 'mm', 'a4');
          const width = pdfObj.internal.pageSize.getWidth();
          const height = pdfObj.internal.pageSize.getHeight();
          pdfObj.addImage(contentDataURL, 'JPG', 0, 0, width, height);
          const d = this.getDateInProperFormat(payslip.PayPeriodBeginDate);
          const fileName = `${payslip.EmployeeName}_${this.getMonth(d)}${d.getFullYear().toString().substr(-2)}.pdf`;
          pdfObj.save(fileName);
          resolve(true);
        });
      }
    });
  }

  getMonth(date: Date) {
    const month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    var d = date;
    var n = month[d.getMonth()];
    return n;
  }

  getDateInProperFormat(dateStr: string) {
    let dateVal = dateStr.split('-');
    return new Date(`${dateVal[1]}-${dateVal[0]}-${dateVal[2]}`);
  }

  csvJSON(csv) {

    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {

      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);

    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }

  getCompanyList(): Array<Company> {
    const companyList: Array<Company> = [
      {
        name: 'codeblaze',
        displayName: 'Codeblaze Technologies Pvt Ltd',
        address: '9/A-1,Manorath Compound,Opp C.S.Patel Enclaves,Pratapgunj,Vadodara-390002',
        mobileNo: '+919662649880',
        logo: './assets/logos/codeblaze.png'
      },
      {
        name: 'radiance',
        displayName: 'Radiance International',
        address: 'First Floor Acme House, Kothi Char Rasta, Kothi, Raopura-390001',
        mobileNo: '+919662649880',
        logo: './assets/logos/radiance.png'
      }
    ]

    return companyList;
  }
}
