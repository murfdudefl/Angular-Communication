import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter } from '@angular/core';
import { Input, OnChanges, SimpleChanges, Output } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {

  private _listFilter: string;

  @ViewChild('filterElement') filterElementRef: ElementRef;
  @Input() includeDetail: boolean;
  @Input() hitCount: number;
  @Output() filterValueChanged: EventEmitter<string> = new EventEmitter<string>();

  hitMessage: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['hitCount']) {
      switch (this.hitCount)
      {
        case 0:
          this.hitMessage = 'No matches found';
          break;
        case 1:
          this.hitMessage = '1 match found';
          break;
        default:
          this.hitMessage = `${this.hitCount} matches found`;
          break;
      }
    }
  }

  ngAfterViewInit(): void {
    this.filterElementRef.nativeElement.focus();
    console.log(`Include detail: ${this.includeDetail}`);
  }

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    console.log(`Child list filter changed to ${value}`);
    this._listFilter = value;
    this.filterValueChanged.emit(value);
  }
}
