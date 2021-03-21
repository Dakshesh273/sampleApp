import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  userName: any;
  isLoggedIn: any;
  private loginEvent = new Subject<any>();

  constructor(public http: HttpClient) { }

  getUsers(){
      return this.http.get("https://reqres.in/api/users?page=2")
        .pipe(map((response: any) => response))
  }

  deleteUser(userId){
    return this.http.delete("https://reqres.in/api/users/"+userId)
    .pipe(map((response: any) => response))
  }

  addUser(userData){
    return this.http.post("https://reqres.in/api/users/", userData)
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
