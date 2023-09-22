import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FileUploadModule } from 'ng2-file-upload';
import { NgxSelectModule } from 'ngx-select-ex';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { NewPinComponent } from './new-pin/new-pin.component';
import { AppModalComponent } from './app-modal/app-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import { AppService } from './app.service';

@NgModule({
  declarations: [			
    AppComponent,
      NewCustomerComponent,
      NewPinComponent,
      AppModalComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSelectModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
