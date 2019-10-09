import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  @Input() payslips: any;
  @Output() downloadPdf = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  download(index) {
    this.downloadPdf.emit(index);
  }
}
