import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.page.html',
  styleUrls: ['./user-add.page.scss'],
})
export class UserAddPage implements OnInit {
  
  userForm: any;

  constructor(public formBuilder: FormBuilder, public userService: UserService, public loadingService: LoadingService, 
              public modalCtrl: ModalController, public toastService: ToastService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.email, Validators.pattern(/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,3})$/)])]
    });
  }

  addUser(){
    let userData ={
      "first_name": this.userForm.controls.firstName.value,
      "last_name": this.userForm.controls.lastName.value,
      "email": this.userForm.controls.email.value
    }
    this.loadingService.presentLoading("Please wait...");
    this.userService.addUser(userData).subscribe((result) => {
      console.log(result);
      this.loadingService.dismissLoading();
      this.closeModal();
      this.toastService.presentToast("User created successfully!");
    })  
  }

  closeModal(){
      this.modalCtrl.dismiss();
  }

}
