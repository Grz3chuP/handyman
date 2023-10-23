import {Component, ElementRef, Renderer2, signal} from '@angular/core';
import {
  deletePhotoFromStorage,
  getJobsList,
  getPhotosFromStorage,
  imageURL,
  removeJobFromFirestore,
  userIsLogged
} from "../../firestorm";
import {style} from "@angular/animations";
import {jobListTemplate} from "../../models/joblist";


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {

  photoList: any[any] =  getPhotosFromStorage() ;
  galleryJobsList: any[any] = this.getGalleryItems();

 async getGalleryItems() {
   const jobsList: any  = await getJobsList();
   const photoList = await getPhotosFromStorage();
     setTimeout(() => {


       jobsList.forEach((job: any) => {
         photoList.forEach((photo: any) => {
           if (job.img === photo.name) {
             job.imgUrl = photo.url;
           }
           if (job.before === photo.name) {
             job.beforeUrl = photo.url;
           }
         })
       })

     },  350);




    console.log(jobsList);
    console.log(photoList);
    this.galleryJobsList = jobsList;
    return jobsList;

 }
toggleBlur(image: any) {
image.opacity = 1;
image.blurMod = 0;
}
displayGalleryItems() {

  //  return newGalleryList;
}

deleteThisPost(id: any) {
   console.log(id.id);
   if(id.before !== null) {
      deletePhotoFromStorage(id.before);
   }
   deletePhotoFromStorage(id.img);
   removeJobFromFirestore(id.id);
   this.getGalleryItems();
}

  protected readonly getPhotosFromStorage = getPhotosFromStorage;
  protected readonly imageURL = imageURL;


  protected readonly blur = blur;
  protected readonly style = style;
  protected readonly userIsLogged = userIsLogged;
}
