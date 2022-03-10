import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "pm-criteria",
  templateUrl: "./criteria.component.html",
  styleUrls: ["./criteria.component.css"],
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {
  listFilter: string;
  hitMessage: string;

  @Input() displayCriteria: boolean;
  @Input() hitCount: number;

  @ViewChild("filterElement") filterElementRef: ElementRef;
  constructor() {}

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
