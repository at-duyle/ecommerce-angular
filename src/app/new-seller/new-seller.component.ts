import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-seller',
  templateUrl: './new-seller.component.html',
  styleUrls: ['./new-seller.component.scss']
})
export class NewSellerComponent implements OnInit {

  requestForm: any;
  controlEmail: any;
  controlFullname: any;
  subscription: Subscription;

  constructor(private formBuilder: FormBuilder,
    private router: Router) {
    this.requestForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.maxLength(50)]),
      shopname: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.maxLength(200)]),
      phonenumber: new FormControl('', [Validators.required]),
      latitude: new FormControl('', [Validators.required]),
      longitude: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

}
