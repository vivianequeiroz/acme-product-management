import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "pm-criteria",
  templateUrl: "./criteria.component.html",
  styleUrls: ["./criteria.component.css"],
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {
  hitMessage: string;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() displayCriteria: boolean;
  @Input() hitCount: number;

  @ViewChild("filterElement") filterElementRef: ElementRef;
  constructor() {}

  private _listFilter: string;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit(value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    let isHitCount = !(
      changes["hitCount"] && !changes["hitCount"].currentValue
    );

    if (!isHitCount) {
      this.hitMessage = "No matches found";
    } else {
      this.hitMessage = "Hits: " + this.hitCount;
    }
  }

  ngAfterViewInit(): void {
    if (this.filterElementRef) {
      this.filterElementRef.nativeElement.focus();
    }
  }

  ngOnInit() {}
}
