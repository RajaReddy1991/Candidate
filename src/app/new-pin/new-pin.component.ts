import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { AppService } from '../app.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
// import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-new-pin',
  templateUrl: './new-pin.component.html',
  styleUrls: ['./new-pin.component.css']
})
export class NewPinComponent implements OnInit {

  @Output() onPinCreation = new EventEmitter();

  droppedFileName: string= "";
  pinForm!: FormGroup;
  customers$ = this.appService.getAllCustomers().pipe(
    map((customers: any) => {
      return customers.map((c: any) => c.title)
    })
  )
  

  public uploader: FileUploader = new FileUploader({
    url: '',
    disableMultipart: true
  });

  constructor(private fb: FormBuilder,  private appService: AppService) { }

  ngOnInit() {
   
    


    this.pinForm = this.fb.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      collab: ['', Validators.required],
      privacy: ['', Validators.required],
    })
  }

  createPin() {
    this.pinForm.markAllAsTouched();
    if(this.pinForm.valid) {
      this.appService.addNewPins(this.pinForm.value);
      this.onPinCreation.emit(true);
      this.pinForm.reset();

    }
  }


  async onFileSelected(f: any) {
    console.log(f[0]);
    this.droppedFileName = f[0].name;
    const base64 = await this._getBase64(f[0])
    this.pinForm.get('image')?.setValue(base64);
  }

  private _getBase64(file: File) {
    return new Promise((resolve, reject) => {

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    })
  }


 
}
