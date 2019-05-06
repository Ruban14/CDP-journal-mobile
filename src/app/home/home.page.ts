import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { NavController, LoadingController, Platform, ToastController } from '@ionic/angular';
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
  user: any;
  need_print: boolean;


  constructor(private httpService: HttpService, private file: File, private fileOpener: FileOpener, private toastCtrl: ToastController,private loadingCtrl:LoadingController,
    private navCtrl: NavController, private storage: Storage, private activatedRoute: ActivatedRoute, private dataTransfer: DataTransferService,private platform: Platform) {
    // get user data from storage
    this.storage.get('name').then((name) => {
      console.log("--home--")
      console.log(name)
      let name_dict = {
        "name": name
      }
      this.httpService.getUserTypeByName(name_dict).subscribe((data) => {
        console.log(data)
        this.user = data
      })
    });

    // get journal list
    this.httpService.serveJournalList().subscribe((data) => {
      console.log(data);
      this.journal_datas = data;
    });

  }

  navigateToRegisterSubscriber() {
    this.navCtrl.navigateForward('/login')
  }

  updatePrintNeed(event) {
    console.log(event)
    this.need_print = event['detail']['checked']
    console.log(this.need_print)
    let update_need_print_dict = {
      "need_print": this.need_print,
      "user_name": this.user['name']
    }
    this.httpService.updateNeedPdf(update_need_print_dict).subscribe((data) => {
      this.displayToast("updated the print copy")
    })
  }

  async displayToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      position: 'top',
      duration: 1000
    });
    toast.present();
  }

  async getPdfdocument(journal) {
    console.log(journal);
    let loading = await this.loadingCtrl.create({
      animated: true,
      spinner: 'lines-small',
    });
    loading.present();

      // let encoded_pdf = data
      let file_name: string = String(journal['name'] +'.pdf');
      // console.log(journal['pdf'])
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

ngOnInit() {
}
}
