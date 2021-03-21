import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { UserAddPage } from '../user-add/user-add.page';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {
  
  users: any;

  constructor(public userService: UserService, public toastService: ToastService, public alertController: AlertController, 
              public loadingService: LoadingService, public modalController: ModalController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.userService.getUsers().subscribe((result) => {
      console.log(result);
      this.users = result.data;
    })  
  }

  deleteUser(userId){
    this.loadingService.presentLoading("Please wait...");
    this.userService.deleteUser(userId).subscribe((result) => {
      console.log(result);
      if(result == null){
        this.loadingService.dismissLoading();
        this.toastService.presentToast("User deleted!"); 
      }
    })
  }

  async confirmDeleteAction(userId){
    let options: any = {
      header: 'Are you sure you want to remove this user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Remove',
          handler: (data) => {
            this.deleteUser(userId);
          }
        }
      ]
    };
    const alert = await this.alertController.create(options);
    await alert.present();
  }

  async openUserModal(){
    const modal = await this.modalController.create({
      component: UserAddPage
    });
    return await modal.present();
  }

}
