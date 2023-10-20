import { Component } from '@angular/core';
import {addPhotoToStorage, checkUserIsLogin, login, logout, userIsLogged} from "../../firestorm";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  emailFromForm = '';
  passwordFromForm = '';
  imageFromForm: any = null;
  test: any = userIsLogged();
  fileItem: any = null;
  protected readonly userIsLogged = userIsLogged;

  loginButtonClicked() {
    login(this.emailFromForm, this.passwordFromForm);
  }

  logOutButtonClicked() {
    logout();
  }

  selectPhoto(imageInput: any) {
    console.log(imageInput);
    this.imageFromForm = imageInput.files[0];

    console.log(this.imageFromForm);

  }
  testowanieOpozniania =  (time: number) => {
    setTimeout(() => {
      return  userIsLogged();
    },  time);

  }
  protected readonly addPhotoToStorage = addPhotoToStorage;

  protected readonly checkUserIsLogin = checkUserIsLogin;
}
