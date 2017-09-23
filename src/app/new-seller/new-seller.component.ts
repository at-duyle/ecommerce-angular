import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../shared/services';
import { NotificationService } from '../shared/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-seller',
  templateUrl: './new-seller.component.html',
  styleUrls: ['./new-seller.component.scss']
})
export class NewSellerComponent implements OnInit {

  requestForm: any;
  controlPhone: Subscription;
  controlEmail: Subscription;
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private requestService: RequestService,
    private notify: NotificationService
    ) {
    this.requestForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.maxLength(50)]),
      shop_name: new FormControl('', [Validators.required]),
      shop_address: new FormControl('', [Validators.maxLength(200)]),
      phone_number: new FormControl('', [Validators.required]),
      latitude: new FormControl('', [Validators.required]),
      longitude: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.controlEmail =
    this.requestForm.controls.email.valueChanges.subscribe(
      (val: any) => {
        let pattern = new RegExp(/\w+@\w+\.{1}[a-zA-Z]{2,}/);
        if(!pattern.test(val)){
          this.requestForm.controls.email.setErrors({'Error': true});
        } else {
          this.requestForm.controls.email.setErrors(null);
        }
      });
    this.controlPhone =
    this.requestForm.controls.phone_number.valueChanges.subscribe(
      (val: any) => {
        let pattern = new RegExp(/^0(1\d{9}|9\d{8})$/);
        if(!pattern.test(val)){
          this.requestForm.controls.phone_number.setErrors({'Error': true});
        } else {
          this.requestForm.controls.phone_number.setErrors(null);
        }
      });
  }

  sendRequest(){
    let request = this.requestForm.value;
    this.subscription = this.requestService.sendRequest(request).subscribe(
      (data: any) => {
        this.notify.printSuccessMessage(data.message);
      }, (err: any) => {
        if(Array.isArray(err)){
            for (let error of err) {
              this.notify.printErrorMessage(error);
            }
          } else {
            this.notify.printErrorMessage(err.errors);
          }
      }
    );
  }

  ngOnDestroy(){
    if(this.controlEmail != undefined){
      this.controlEmail.unsubscribe();
    }
    if(this.controlPhone != undefined){
      this.controlPhone.unsubscribe();
    }
  }
}
