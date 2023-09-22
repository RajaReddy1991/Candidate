import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

enum LOCAL_STORAGE_KEYS {
    Customers = 'customers',
    Pins = 'pins',
}


@Injectable()
export class AppService {

    customers$ = new BehaviorSubject<any[]>(this.getFromLocalStorage(LOCAL_STORAGE_KEYS.Customers));
    pins$ = new BehaviorSubject<any[]>(this.getFromLocalStorage(LOCAL_STORAGE_KEYS.Pins));
    
    constructor() { 
        
    }

    getAllCustomers() {
        return this.customers$;
    }

    addNewCustomer(customer: any) {
        this.saveToLocalStorage(LOCAL_STORAGE_KEYS.Customers, customer);
        this.customers$.next(this.getFromLocalStorage(LOCAL_STORAGE_KEYS.Customers));
    }
    
    getAllPins() {
        return this.pins$;
    }

    addNewPins(pin: any) {
        this.saveToLocalStorage(LOCAL_STORAGE_KEYS.Pins, pin);
        this.pins$.next(this.getFromLocalStorage(LOCAL_STORAGE_KEYS.Pins));
    }

    saveToLocalStorage(key: string, value: any) {
        let obj = JSON.parse(localStorage.getItem(key) || '[]')
        if (obj.length > 0) {
            obj.push(value);
        } else {
            obj = [value];
        }
        localStorage.setItem(key, JSON.stringify(obj))
    }

    getFromLocalStorage(key: string) {
        return JSON.parse(localStorage.getItem(key) || '[]');
    }

}
