import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, map, shareReplay } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  @Output() onCustomerCreation = new EventEmitter();
  regionList$!: any;


  customerForm!: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private appService: AppService) {
    this.regionList$ = this.http.get("https://api.first.org/data/v1/countries", { withCredentials: false })
      .pipe(
        map((x: any) => {
          const regionList: any = [];
          Object.keys(x.data).forEach(k => {
            const region = regionList.find((r: any) => r.region === x.data[k].region);
            if (!region) {
              regionList.push({
                region: x.data[k].region,
                countries: [x.data[k].country]
              })
            } else {
              region.countries.push(x.data[k].country)
            }
          });
          return regionList;
        }),
        shareReplay({ bufferSize: 1, refCount: true }),
      )
  }

  ngOnInit() {
    this.customerForm = this.fb.group({
      title: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      region: [null, Validators.required],
      country: ['', Validators.required],
    })
  }

  createCustomer() {
    this.customerForm.markAllAsTouched();
    if(this.customerForm.valid) {
      const customer = this.customerForm.value;
      customer.region = this.customerForm.get('region')?.value.region;
      this.appService.addNewCustomer(customer);
      this.onCustomerCreation.emit(true);
      this.customerForm.reset();
    }
  }


  

}
