import { eventNames } from '@angular/language-service/src/html_info';
import { Component, HostListener, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'filter-tab-panel',
  templateUrl: './filter-tab-panel.component.html',
  styleUrls: ['./filter-tab-panel.component.css']
})
export class FilterTabPanelComponent implements OnInit {
  public hideFilter:boolean;
  selectedTab:String="";
  @Input() public hideFilterTab:boolean=true;
  @Input() public resetFilter:boolean;
  @Input() public masterForm:boolean;
  @Output() public formSubmit:EventEmitter<any> = new EventEmitter<any>();
  // @HostListener('document:click', ['$event'])
  // public onClick(event: Event) {
  //     if (this.selectedTab) {
  //         this.closeTab(event);
  //     }
  // }

  constructor() { }

  ngOnInit() {
  }

  public stopPropagation(event: Event): void {
      //event.preventDefault();
      event.stopPropagation();
  }


  public setActiveTab(event: any): void {
      this.selectedTab = event.nextId;
      this.hideFilter=false;
      //console.log('selected tab event object=', event);
  }

  public onFilterSubmit(event){
    this.formSubmit.emit(event)
  }


}
