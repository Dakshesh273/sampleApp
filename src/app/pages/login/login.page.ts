import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  signinForm: any;

  constructor(public formBuilder: FormBuilder, public toastService: ToastService, public userService: UserService, public router: Router, public menuCtrl: MenuController) {
   

   }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  } 

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.pattern(/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,3})$/)])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  signIn(){

   if(this.signinForm.controls.password.value != 'Admin@123'){
    this.toastService.presentToast("Please enter correct password");
    return;
   }
   this.menuCtrl.enable(true);
   this.userService.publishLoginrEvent({ isLogin: true });
   this.userService.setUserDataToLocal(this.signinForm.controls.email.value.split('@')[0], "true");
   this.router.navigate(['user-list/']);

  }

}
