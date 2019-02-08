import { NgOnChangesFeature } from '@angular/core/src/render3/features/ng_onchanges_feature';
import { AfterViewInit, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'p-modal',
  templateUrl: './p-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class PModal{
    [x: string]: any;
  closeResult: string;
  modalTitle:string;
  modalBody:string;
  @ViewChild('content') public modalContent:ElementRef;

  constructor(private modalService: NgbModal) {}

  ngAfterViewInit() {
    this.modalTitle = "Hi there!!";
    //this.contentElem = this.contentDiv.nativeElement;
    //console.log('ngAfterViewChecked in modal');
  }

  openBackDropCustomClass(content) {
    //console.log('inside openBackDropCustomClass');
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}