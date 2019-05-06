import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ToastController, NavController } from '@ionic/angular';
import { DataTransferService } from '../provider/data-transfer.service';
@Component({
  selector: 'app-register-subscriber',
  templateUrl: './register-subscriber.page.html',
  styleUrls: ['./register-subscriber.page.scss'],
})

export class RegisterSubscriberPage implements OnInit {

  purpose_datas: any;
  subscriber_type: any;
  name: string = null;
  street_address: any = null;
  state: string = null;
  taluk: string = null;
  email: any = null;
  district: string = null;
  pincode: number = null;
  phone_number: number = null;
  no_of_trees: number = null;
  purpose_of_trees: string = null;
  subscriber_register_dict: any;

  constructor(private httpService: HttpService, private toastCtrl: ToastController, private navCtrl: NavController, private dataTransfer: DataTransferService) {
    // print and online details
    this.subscriber_type = dataTransfer.user_details
    console.log(this.subscriber_type)

    // to get the list of purpose of trees - Neera , Tender etc
    this.httpService.servePurposeOfTrees().subscribe((data) => {
      this.purpose_datas = data
      console.log(this.purpose_datas)
    });
  }

  navigateToHome(){
    this.navCtrl.navigateForward('/number-login')
  }
  
  // store new subscriber details
  onSubscribeRegister() {
    // with print
    if (this.subscriber_type['print'] == "print") {
      if (this.name == null || this.street_address == null || this.state == null ||
        this.taluk == null || this.district == null || this.pincode == null || this.phone_number == null) {
        alert("*fields are manditory");
        return false;
      }
      this.subscriber_register_dict = {
        "name": this.name,
        "street_address": this.street_address,
        "state": this.state,
        "taluk": this.taluk,
        "district": this.district,
        "pincode": this.pincode,
        "phone_number": this.phone_number,
        "purpose_of_trees": this.purpose_of_trees,
        "no_of_trees": this.no_of_trees,
        "email": this.email,
        "need_print": true
      }
    }
    // only online
    if (this.subscriber_type['print'] == "online") {
      if (this.name == null || this.phone_number == null || this.pincode == null) {
        alert("*fields are manditory");
        return false;
      }
      this.subscriber_register_dict = {
        "name": this.name,
        "phone_number": this.phone_number,
        "email": this.email,
        "purpose_of_trees": this.purpose_of_trees,
        "no_of_trees": this.no_of_trees,
        "need_print": false,
        "pincode": this.pincode
      }
    }
    // post to store data
    console.log(this.subscriber_register_dict)
    this.httpService.storeSubscriber(this.subscriber_register_dict).subscribe((data) => {
      console.log(data)
      if (data != null) {
        this.displayToast(data)
      }
      else {
        this.displayToast("registered success")
        this.navCtrl.navigateForward('/number-login');
      }

    })
  }
  // toast
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
