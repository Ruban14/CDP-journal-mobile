import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
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
    phone_number: any;
    print: any ;
    user_details: any;
    email: any;
    online: any;
    online_and_print: any;

    constructor(private navCtrl: NavController,private toastCtrl:ToastController ,private activatedRoute: ActivatedRoute, private httpService: HttpService, private storage: Storage, private dataTransfer: DataTransferService, private statusBar: StatusBar) {
        this.statusBar.overlaysWebView(true);
        console.log('came')
        // this.phone_number = this.activatedRoute.snapshot.paramMap.get('number');
        this.storage.get('user').then((name) => {
            this.user_details = name
            this.httpService.getUserTypeByName(name).subscribe((data) => {
                console.log(data)
                if (data["email"] != null) {
                    this.email = data["email"]
                    console.log("email", this.email)
                }
                if (data['online'] == true && data['need_print'] == true) {
                    this.print = 'print'
                }
                if (data['online'] == true && data['need_print'] == false) {
                    this.print = 'online'
                }
                if (data['online'] == false && data['need_print'] == true) {
                    this.print = 'print'
                }
            })
        })
    }

    onSubmit() {
        // console.log("online",this.online)
        console.log("print", this.print)
        if (this.print == null) {
            alert("select atleast one choice")
            return false;
        }
        if (this.print == "online") {
            let data_dict = {
                "print": this.print,
            }
            this.dataTransfer.SendUserDetails(data_dict);
            this.navCtrl.navigateForward('/online-register')
        }
        if (this.print == "print") {
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
