import { Component } from '@angular/core';

import { NewCustomerComponent } from './new-customer/new-customer.component';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'test';
  isCustomerModalOpen = false;
  isPinModalOpen = false;
  pinsList$ = this.appService.getAllPins();
  constructor(private appService: AppService) {}



  openNewCustomerDialog() {
    this.isCustomerModalOpen = true;
  }

  openNewPinDialog() {
    this.isPinModalOpen = true;
  }

  onPinCreation(pin: any) {
    console.log({pin});
    this.isPinModalOpen = false;
  }
  
  
}
