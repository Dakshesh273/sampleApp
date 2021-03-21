import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  userName: any;
  isLoggedIn: any;
  webAPI: string = environment.webAPI;
  private loginEvent = new Subject<any>();

  constructor(public http: HttpClient) { }

  getUsers(){
      return this.http.get(this.webAPI+"?page=2")
        .pipe(map((response: any) => response))
  }

  deleteUser(userId){
    return this.http.delete(this.webAPI+userId)
    .pipe(map((response: any) => response))
  }

  addUser(userData){
    return this.http.post(this.webAPI, userData)
    .pipe(map((response: any) => response))
  }

  setUserDataToLocal(userName, isLoggedIn){
    this.userName = userName;
    this.isLoggedIn = isLoggedIn;
    localStorage.setItem("userName", userName);
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }

  getUserDataFromLocal(){
    this.userName = localStorage.getItem("userName");
    this.isLoggedIn = localStorage.getItem("isLoggedIn");
  }

  publishLoginrEvent(data: any) {
    console.log('Publishing User Event', data);
    this.loginEvent.next(data);
  }

  getLoginEvent(): Subject<any> {
    return this.loginEvent;
  }
}
