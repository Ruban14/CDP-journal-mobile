import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ToastController, NavController } from '@ionic/angular';
import { DataTransferService } from '../provider/data-transfer.service';
import { Storage } from '@ionic/storage';
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
  user_details: any;

  constructor(private httpService: HttpService,private Navctrl:NavController, private toastCtrl: ToastController, private navCtrl: NavController, private dataTransfer: DataTransferService, private storage: Storage) {

    this.storage.get('user').then((name) => {
      this.user_details = name
      this.httpService.serveProfileData(name).subscribe((data) => {
        console.log(data)
        this.name = data['name']
        this.street_address = data['street']
        this.state = data['state']
        this.taluk = data['taluk']
        this.district = data['district']
        this.pincode = data['pincode']
        this.phone_number = data['phone_number']
        this.email = data['email']
      })
    })





    // print and online details
    this.subscriber_type = dataTransfer.user_details
    console.log(this.subscriber_type)

    // to get the list of purpose of trees - Neera , Tender etc
    this.httpService.servePurposeOfTrees().subscribe((data) => {
      this.purpose_datas = data
      console.log(this.purpose_datas)
    });
  }

  navigateToHome() {
    this.navCtrl.navigateForward('/')
  }

  // store new subscriber details
  onSubscribeRegister() {
    // with print
    if (this.name == null || this.street_address == null || this.state == null || this.taluk == null || this.district == null || this.pincode == null || this.phone_number == null) {
      alert("*Fill the mandatory fields !");
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

  console.log(this.subscriber_register_dict)
    this.httpService.storeSubscriber(this.subscriber_register_dict).subscribe((data) => {
    console.log(data)
    if (data != null) {
      this.Navctrl.navigateForward('/')
    }
    else {
      alert("Dear " + this.name +", Your address has been updated successfully!. You will start receiving print subscription at the given address as soon as possible. Thank you!")
      this.navCtrl.navigateForward('/');
    }

  })
  }

ngOnInit() {
}

}
