import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {

  listFilter: string;

  @ViewChild('filterElement') filterElementRef: ElementRef;
  @Input() includeDetail: boolean;
  @Input() hitCount: number;
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
      if (this.hitCount === 0) {
      } else {
      }
    }
  }

  ngAfterViewInit(): void {
    this.filterElementRef.nativeElement.focus();
    console.log(`Include detail: ${this.includeDetail}`);
  }
}
