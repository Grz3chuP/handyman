import { Component } from '@angular/core';
import {
  addJobToFirestore,
  addPhotoToStorage,
  checkUserIsLogin,
  getJobsList, getPhotosFromStorage,
  login,
  logout,
  userIsLogged
} from "../../firestorm";
import {jobListTemplate} from "../../models/joblist";




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
      const jobListTodb: jobListTemplate = new jobListTemplate(0, this.titleFromForm, this.descriptionFromForm, this.imageFromForm.name, null, null, null, 0.6, 20, this.tagFromForm)
      // addJobToFirestore(this.titleFromForm, this.descriptionFromForm, this.imageFromForm.name, null);
      console.log(jobListTodb);
      addJobToFirestore(jobListTodb);
      addPhotoToStorage(this.imageFromForm)
    }
    if (this.imageFromFormBefore !== null) {
      const jobListTodb: jobListTemplate = new jobListTemplate(0, this.titleFromForm, this.descriptionFromForm, this.imageFromForm.name, null, this.imageFromFormBefore.name, null, 0.6, 20, this.tagFromForm)
      console.log(jobListTodb);
      addJobToFirestore(jobListTodb);
      addPhotoToStorage(this.imageFromFormBefore);
      addPhotoToStorage(this.imageFromForm)

    }
  }
  galleryJobsList: any[any] = this.getGalleryItems();
  async getGalleryItems() {
    const jobsList: any  = await getJobsList();
    const photoList = await getPhotosFromStorage();
    setTimeout(() => {


      jobsList.forEach((job: any) => {
        photoList.forEach((photo: any) => {
          if (job.img === photo.name) {
            job.img = photo.url;
          }
          if (job.before === photo.name) {
            job.before = photo.url;
          }
        })
      })

    },  200);




    console.log(jobsList);
    console.log(photoList);
    this.galleryJobsList = jobsList;
    return jobsList;

  }

  protected readonly addPhotoToStorage = addPhotoToStorage;

  protected readonly checkUserIsLogin = checkUserIsLogin;
  tagFromForm: Array<string> = [];
  singleTagFromForm = '';

  addTagToThisItem() {
    if(this.singleTagFromForm === '') {
      alert('Wpisz tag');
      return;
    } else {
      this.tagFromForm.push(this.singleTagFromForm);
      this.singleTagFromForm = '';
    }

  }

  removeTag(tag: string) {
    this.tagFromForm = this.tagFromForm.filter(item => item !== tag);

  }
}
