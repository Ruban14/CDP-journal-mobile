import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  user_details: any;

  constructor() { }

  SendUserDetails(user_obj) {
    this.user_details = user_obj;
  }

}
