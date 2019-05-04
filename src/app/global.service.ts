import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  // host
  // private _server_url = 'http://localhost:8000/';
  private _server_url = 'http://192.168.0.5:8000/';

  // app version
  private _app_version: string = '0.0.1';
  
  constructor(private toastCtrl: ToastController) { }
    get server_url() {
      return this._server_url;
    }
  
    get app_version() {
      return this._app_version;
    }
  
    async displayToast(message: string, position: any, duration: number) {
      const toast = await this.toastCtrl.create({
        message: message,
        position: position,
        duration: duration
      });
      toast.present();
    }
  
  }
