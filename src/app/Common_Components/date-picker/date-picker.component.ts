import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateTimeConstants } from '../../constants/date-time-formats';

@Component({
  selector: 'custom-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {

  constructor() {

   }

  @Input() date_label = "Date"
  @Input('lang') set language(value: number) {   //1-English 2-Sinhala 3-chinese
    this.loadMonthNames(value);
  }
  @Input() selectedDate: any = new Date().toISOString();
  @Input() minDate: any = '2020-01-01';
  @Input() maxDate: any = '2100';
  @Input() displayFormat = "DD MMM YYYY";
  @Input() pickerFormat = "DD MMM YYYY";
  @Input() disabled = false;

  @Output() onDateChange: EventEmitter<any> = new EventEmitter();

  monthShortNames: string[] = [];

  ngOnInit() {
    console.log('created');
    this.whenDateChanged();
  }

  loadMonthNames(lang: number) {
    if (lang == 2) {
      this.monthShortNames = DateTimeConstants.getSinhalaShortMonthNames();
    } else if (lang == 1) {
      this.monthShortNames = DateTimeConstants.getEnglishShortMonthNames();
    }
  }

  whenDateChanged() {
    this.onDateChange.emit(this.selectedDate);
  }
}
