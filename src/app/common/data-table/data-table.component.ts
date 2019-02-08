import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  @Input ('rowsPerPage') private rowsPerPage : Number;
  @Input('header') public header : string[];
  @Input('data') public data:string[];

  constructor() { }

  ngOnInit() {
    // console.log(this.data);
    // console.log(this.rowsPerPage);
  }

}
