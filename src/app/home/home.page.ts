import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpService } from '../http.service';
import { NavController, LoadingController, Platform, ToastController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DataTransferService } from '../provider/data-transfer.service';
import { Storage } from '@ionic/storage'
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  journal_datas: any = null;
  user: any = null;
  need_print: boolean;
  user_details: Object;
  number_dict: any;


  constructor(private httpService: HttpService, private file: File, private fileOpener: FileOpener, private toastCtrl: ToastController, private loadingCtrl: LoadingController,
    private navCtrl: NavController, private storage: Storage, private activatedRoute: ActivatedRoute, private dataTransfer: DataTransferService, private platform: Platform,
    private alertController: AlertController,private ref:ChangeDetectorRef) {
    // get user data from storage
    this.storage.get('user').then((name) => {
      console.log("--home--",name)
      if (name != null) {
        this.user = name
      }
      else {
        this.user = "Guest";
      }

    });

    // get journal list
    this.httpService.serveJournalList().subscribe((data) => {
      console.log(data);
      this.journal_datas = data;
    });

  }
  // --------constructor ends-----

  // check for exist user
  checkForExistUser(number_dict) {
    this.httpService.getUserType(number_dict).subscribe((data) => {
      console.log(data)
      if (data['exist'] == false){
        this.getName();
      }
      this.storage.set("user", data).then(() => {
        console.log("storage -", data)
        this.user = data;
        this.ref.detectChanges();
      })
    })
  }

  // display alert to get number
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Enter your phone number',
      inputs: [
        {
          name: 'number',
          value: '',
          type: 'number',
          placeholder: 'Enter your phone number'
        },
      ],
      buttons: [
        {
          text: 'Ok',
          handler: (number_dict) => {
            if (number_dict['number'] == ""){
              this.displayToast("please enter mobile number");
              return false;
            }
            console.log(number_dict)
            this.number_dict = number_dict
            this.checkForExistUser(number_dict);
          }
        }
      ]
    });
    await alert.present();
  }

  // alert to get name
  async getName() {
    const alert = await this.alertController.create({
      header: 'Enter your Name',
      inputs: [
        {
          name: 'name',
          value: '',
          type: 'text',
          placeholder: 'Enter your Name'
        },
      ],
      buttons: [
        {
          text: 'Ok',
          handler: (name_dict) => {
            if (name_dict['name'] == ""){
              this.displayToast("please enter name");
              return false;
            }
            this.storeNewUser(name_dict);
          }
        }
      ]
    });
    await alert.present();
  }

  // posting to save the name and number
  storeNewUser(name_dict){
    console.log(name_dict)
    console.log(this.number_dict)
    let guest_store_dict = {
      "name":name_dict['name'],
      "number":this.number_dict['number']
    }
    this.httpService.storeNameAndNumber(guest_store_dict).subscribe(()=>{
      this.checkForExistUser(guest_store_dict);
    })
  }

  // open pdf
  async getPdfdocument(journal) {
    console.log(journal);
    let loading = await this.loadingCtrl.create({
      animated: true,
      spinner: 'lines-small',
    });
    loading.present();
    let file_name: string = String(journal['name'] + '.pdf');
    const binary_string = window.atob(journal['pdf']);
    const binary_length = binary_string.length;
    const bytes = new Uint8Array(binary_length);
    for (let i = 0; i < binary_length; i++) {
      bytes[i] = binary_string.charCodeAt(i)
    }
    console.log(bytes);
    this.platform.ready().then(() => {
      const blob: Blob = new Blob([bytes], { type: 'application/pdf' });
      this.file.writeFile(this.file.externalApplicationStorageDirectory, file_name, blob, { replace: true }).then(() => {
        this.fileOpener.open(this.file.externalApplicationStorageDirectory + file_name, 'application/pdf')
      })
      loading.dismiss();
    }).catch((error) => {
      alert(JSON.stringify(error))
      loading.dismiss();
    })
    console.log(binary_length)
  }
  // navigate to user login
  navigateToSelectSubscription(){
    this.navCtrl.navigateForward('/user-login')
  }

  // toast
  async displayToast(message) {
        const toast = await this.toastCtrl.create({
          message: message,
          position: 'top',
          duration: 1000
        });
        toast.present();
      }
  
  ngOnInit() {
  }
}

  // //   navigateToRegisterSubscriber() {
  // //     this.navCtrl.navigateForward('/login')
  // //   }

  // //   updatePrintNeed(event) {
  // //     console.log(event)
  // //     this.need_print = event['detail']['checked']
  // //     console.log(this.need_print)
  // //     let update_need_print_dict = {
  // //       "need_print": this.need_print,
  // //       "user_name": this.user['name']
  // //     }
  // //     this.httpService.updateNeedPdf(update_need_print_dict).subscribe((data) => {
  // //       this.displayToast("updated the print copy")
  // //     })
  // //   }

  // //  
 

  // // check the number exists or not
  // checkForExistUser(number_dict) {
  //   this.httpService.getUserType(number_dict).subscribe((data) => {
  //     console.log(data)
  //     this.storage.set("user",data).then(()=>{
  //       console.log("storage -",data)
  //     })
  //   })
  //   this.storage.get("user").then((user_type)=>{
  //     console.log("-storage-retrived",user_type)
  //     if (user_type != null){
  //       this.user = user_type
  //     }
  //   })
  // }



