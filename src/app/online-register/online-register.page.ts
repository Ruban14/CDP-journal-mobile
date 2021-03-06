import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage'
import { HtmlParser } from '@angular/compiler';
import { HttpService } from '../http.service';
import { NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-online-register',
  templateUrl: './online-register.page.html',
  styleUrls: ['./online-register.page.scss'],
})
export class OnlineRegisterPage implements OnInit {
  user_details: any;
  email:any;
  user_data : any;
  constructor(private activate:ActivatedRoute,private storage:Storage,private httpService:HttpService,private Navctrl:NavController, private toastCtrl:ToastController) { 
    this.storage.get('user').then((name) => {
      this.user_details = name
      this.httpService.getUserTypeByName(name).subscribe((data)=>{
        console.log(data)
        this.user_data = data
        if (data["email"] != null){
          this.email = data["email"]
          console.log("email",this.email)
        }
      })
    })
    
  }
  onSubmit(){
    console.log(this.user_details)
    let email_dict = {
      "email":this.email,
      "name":this.user_details['name']
    }
    console.log(email_dict)
    this.httpService.saveEmail(email_dict).subscribe((data)=>{
      this.Navctrl.navigateForward('/')
      alert('Dear ' +   this.user_data['name'] + ',Your email Id has been updated successfully!. You will start receiving e-mails at the given address as soon as possible. Thank you!')
    })
  }


  ngOnInit() {
  }

}
