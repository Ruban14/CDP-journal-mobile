import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage'
import { HtmlParser } from '@angular/compiler';
import { HttpService } from '../http.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-online-register',
  templateUrl: './online-register.page.html',
  styleUrls: ['./online-register.page.scss'],
})
export class OnlineRegisterPage implements OnInit {
  user_details: any;
  email:any;
  constructor(private activate:ActivatedRoute,private storage:Storage,private httpService:HttpService,private Navctrl:NavController) { 
    this.storage.get('user').then((name) => {
      this.user_details = name
      this.httpService.getUserTypeByName(name).subscribe((data)=>{
        console.log(data)
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
    })
  }
  ngOnInit() {
  }

}
