import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IonSearchbar} from '@ionic/angular';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ width: 0, opacity: 0 }),
            animate('1s ease-out',
                    style({ width: '100%' , opacity: 1 }))
          ]
        )
      ]
    )
  ]
})
export class SearchBarComponent implements OnInit {

  constructor() { }
  @ViewChild('searchbarinput') searchbarInputRef: IonSearchbar ;

  // tslint:disable-next-line: no-output-native
  @Output() onSearchBarVisible: EventEmitter<any> = new EventEmitter();
  @Output() onTextChanged: EventEmitter<any> = new EventEmitter();
  @Input() searchStartingFrom: number = 1;

  showSearchBar = false;

  ngOnInit() {}

  hideSearchbar() {
    this.showSearchBar = false;
    this.onTextChanged.emit('');
    this.onSearchBarVisible.emit(this.showSearchBar);
  }

  showSearchbar() {
    this.showSearchBar = true;
    this.onSearchBarVisible.emit(this.showSearchBar);
    setTimeout(() => { this.searchbarInputRef.setFocus(); }, 500);
  }

  onTextChange(event: any) {
    if (event.target.value && (event.target.value.length < this.searchStartingFrom)){
      return;
    }
   this.onTextChanged.emit(event.target.value);

  }

  onLoseFocus(val: string) {
    val = val.trim();
    if (val.length === 0) {
      this.hideSearchbar();
    }
  }

}
