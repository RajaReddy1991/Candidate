import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.css']
})
export class AppModalComponent implements OnInit, OnChanges {

  @Input() isOpen!: boolean;
  @Input() title: string = "";
  @Output() onClose = new EventEmitter();

  displayStyle = "none";

  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isOpen'].currentValue)
      this.displayStyle = "block";
    else {
      this.displayStyle = "none";
    }
  }

  

  ngOnInit() {
  }

  openDialog(): void {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
    this.onClose.next(true)
  }

}
