import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from 'src/app/http.service';
import { DataTransferService } from 'src/app/provider/data-transfer.service';
import { Storage } from '@ionic/storage'
import { StatusBar } from '@ionic-native/status-bar/ngx';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage implements OnInit {
  number: number = null;

  constructor(private navCtrl: NavController,private httpService: HttpService,private storage: Storage,private dataTransfer: DataTransferService,private statusBar: StatusBar) {
    this.statusBar.overlaysWebView(true);
   }

  onSubmit(){
    if (this.number == null){
      alert("please fill the number")
    }
    const number_dict= {
      "number": this.number
    }
    this.httpService.getUserType(number_dict).subscribe((data)=>{
      let name = data['name']
      this.storage.set('name', name);
      this.navCtrl.navigateForward('/home')
    })  
  }

  onSkip(){
    this.storage.set('name', "Guest");
    this.navCtrl.navigateForward('/home')
    // this.dataTransfer.SendUserDetails(data);
    // this.storage.set('user_type', 'guest')
  }

  ngOnInit() {
  }

}
