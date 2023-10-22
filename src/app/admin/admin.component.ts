import { Component } from '@angular/core';
import {addJobToFirestore, addPhotoToStorage, checkUserIsLogin, login, logout, userIsLogged} from "../../firestorm";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  emailFromForm = '';
  passwordFromForm = '';
  imageFromForm: any = null;
  imageFromFormBefore: any = null;
  titleFromForm = '';
  descriptionFromForm = '';
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
  selectPhotoBefore(imageInput: any) {
    console.log(imageInput);
    this.imageFromFormBefore = imageInput.files[0];
    console.log(this.imageFromForm);
  }
  testowanieOpozniania =  (time: number) => {
    setTimeout(() => {
      return  userIsLogged();
    },  time);

  }
  addNewJobToFirestore() {
    if (this.imageFromForm === null || this.titleFromForm === '' || this.descriptionFromForm === '') {
      alert('Wypełnij wszystkie pola');
      return;
    }
    if (this.imageFromFormBefore === null) {
      addJobToFirestore(this.titleFromForm, this.descriptionFromForm, this.imageFromForm.name, null);
      addPhotoToStorage(this.imageFromForm)
    }
    if (this.imageFromFormBefore !== null) {
      addJobToFirestore(this.titleFromForm, this.descriptionFromForm, this.imageFromForm.name, this.imageFromFormBefore.name);
      addPhotoToStorage(this.imageFromFormBefore);
      addPhotoToStorage(this.imageFromForm)

    }
  }

  protected readonly addPhotoToStorage = addPhotoToStorage;

  protected readonly checkUserIsLogin = checkUserIsLogin;
}
