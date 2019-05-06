import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Storage } from '@ionic/storage'
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-number-login',
  templateUrl: './number-login.page.html',
  styleUrls: ['./number-login.page.scss'],
})
export class NumberLoginPage implements OnInit {
  number: any;

  constructor(private httpService:HttpService,private storage: Storage,private navCtrl: NavController) { }
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
  }

  navigateToCreateUser(){
    this.navCtrl.navigateForward('/login')
  }

  ngOnInit() {
  }

}
