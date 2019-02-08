import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'bootstrap-test';
  @ViewChild('footer') private footer:ElementRef;
  
  ngOnInit(){
    this.setContainerHeight();
  }

  private setContainerHeight() {
    if (this.footer) {
      // console.log('window height',window.innerHeight);
      // console.log('footer height',this.footer.nativeElement.style.height);
      //window.innerHeight - this.footer.nativeElement.height;
    }
  }
}


