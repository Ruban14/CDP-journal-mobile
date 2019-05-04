import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from  '@angular/common/http';;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private global: GlobalService,private httpClient:HttpClient) {
    console.log('Server URL: ' + this.global.server_url);
  }
  // to get all the published journal list
  serveJournalList() {
    return this.httpClient.get(this.global.server_url + 'main/serve/journal/list/');
  }

  storeSubscriber(data){
    return this.httpClient.post(this.global.server_url + 'main/store/subscriber/',data)
  }
  
  servePurposeOfTrees(){
    return this.httpClient.get(this.global.server_url + 'main/serve/purpose/of/trees/');
  }
  getUserType(data){
    return this.httpClient.post(this.global.server_url + 'main/get/user/type/',data)
  }
  updateNeedPdf(data){
    return this.httpClient.post(this.global.server_url + 'main/update/need/pdf/',data)
  }
  getUserTypeByName(data){
    return this.httpClient.post(this.global.server_url + 'main/get/user/detail/',data)
  }

}
