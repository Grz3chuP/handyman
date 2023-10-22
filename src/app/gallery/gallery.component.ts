import {Component, ElementRef, Renderer2, signal} from '@angular/core';
import {getJobsList, getPhotosFromStorage, imageURL} from "../../firestorm";
import {style} from "@angular/animations";


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
             job.img = photo.url;
           }
           if (job.before === photo.name) {
             job.before = photo.url;
           }
         })
       })

     },  100);




    console.log(jobsList);
    console.log(photoList);
    this.galleryJobsList = jobsList;
    return jobsList;

 }
toggleBlur(image: any) {
image.opacity = 1;
image.blur = 0;
}
displayGalleryItems() {

  //  return newGalleryList;
}

  protected readonly getPhotosFromStorage = getPhotosFromStorage;
  protected readonly imageURL = imageURL;


  protected readonly blur = blur;
  protected readonly style = style;
}
