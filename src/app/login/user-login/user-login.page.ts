import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from 'src/app/http.service';
import { DataTransferService } from 'src/app/provider/data-transfer.service';
import { Storage } from '@ionic/storage'
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage implements OnInit {
  phone_number:any;
  print: any = null;
  constructor(private navCtrl: NavController, private activatedRoute: ActivatedRoute, private httpService: HttpService, private storage: Storage, private dataTransfer: DataTransferService, private statusBar: StatusBar) {
    this.statusBar.overlaysWebView(true);
    this.phone_number = this.activatedRoute.snapshot.paramMap.get('number');
  }

  onSubmit() {
    // console.log("online",this.online)
    console.log("print", this.print)
    if (this.print == null) {
      alert("select atleast one choice")
      return false;
    }
    if (this.print == "online"){
      let data_dict = {
        "print": this.print,
      }
      this.dataTransfer.SendUserDetails(data_dict);
      this.navCtrl.navigateForward('/online-register')
    }
    if (this.print == "print")
    {
      let data_dict = {
        "print": this.print,
      }
      this.dataTransfer.SendUserDetails(data_dict);
      this.navCtrl.navigateForward('/register-subscriber')
    }
  }

  navigateToEmailRegister() {
  }

  navigateToHome() {
    this.navCtrl.navigateForward('/')
  }

  ngOnInit() {
  }

}
