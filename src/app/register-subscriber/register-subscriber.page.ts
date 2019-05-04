import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { ToastController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-register-subscriber',
  templateUrl: './register-subscriber.page.html',
  styleUrls: ['./register-subscriber.page.scss'],
})

export class RegisterSubscriberPage implements OnInit {
  
  subscriber_register: FormGroup;
  purpose_datas: any;
  
  constructor(private formBuilder: FormBuilder,private httpService:HttpService,private toastCtrl:ToastController,private navCtrl:NavController) {
    // to get the list of purpose of trees 
    // Neera , Tender etc
    this.httpService.servePurposeOfTrees().subscribe((data)=>{
      this.purpose_datas=data
      console.log(this.purpose_datas)
    });
    // form
    this.subscriber_register = this.formBuilder.group({
      name: [null, Validators.required],
      street_address: [null, Validators.required],
      state: [null, Validators.required],
      taluk: [null, Validators.required],
      district: [null, Validators.required],
      pincode: [null, Validators.required],
      phone_number: [null, Validators.required],
      no_of_trees: [null, Validators.required],
      purpose_of_trees: [null, Validators.required],
      need_print: [false, Validators.required],
    });
   }
  // store new subscriber details
  onSubscribeRegister(){
    console.log(this.subscriber_register.value)
    this.httpService.storeSubscriber(this.subscriber_register.value).subscribe((data)=>{
      console.log(data)
      if (data != null){
        this.displayToast(data)
      }
      else{
        this.displayToast("registered success")
        this.navCtrl.navigateForward('/');
      }
      
    })
  }
  async displayToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
  ngOnInit() {
  }

}
