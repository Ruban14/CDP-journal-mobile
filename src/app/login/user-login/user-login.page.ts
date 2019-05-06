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

  print: any =null;
  constructor(private navCtrl: NavController, private httpService: HttpService, private storage: Storage, private dataTransfer: DataTransferService, private statusBar: StatusBar) {
    this.statusBar.overlaysWebView(true);
  }

  onSubmit() {
    // console.log("online",this.online)
    console.log("print",this.print)
    if(this.print == null){
      alert("select atleast one choice")
      return false;
    }
    let data_dict = {
      "print":this.print,
      "user_type":'user'
    }
    this.dataTransfer.SendUserDetails(data_dict);
    this.navCtrl.navigateForward('/register-subscriber')
    
  }

  navigateToHome(){
    this.navCtrl.navigateForward('/number-login')
  }

  ngOnInit() {
  }

}
