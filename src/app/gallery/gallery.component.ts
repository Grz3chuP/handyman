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

import * as url from "url";


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {

  photoList: any[any] =  getPhotosFromStorage() ;
  galleryJobsList: any[any] = this.getGalleryItems();
  newJobList: any[any] = [];
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

     },  500);


this.newJobList = jobsList;
this.singleTagList();
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

   if(id.before !== null) {
      deletePhotoFromStorage(id.before);
   }
   deletePhotoFromStorage(id.img);
   removeJobFromFirestore(id.id);
   this.getGalleryItems();
}
uniqueTagList: string[] = [];
 selectedTag: string = 'All';
singleTagList () {
   let tagList: string[] = [];

   this.newJobList.forEach((job: any) => {

     job.tags.forEach((tag: any) => {
       tagList.push(tag);
     })


   });

      this.uniqueTagList = [...new Set(tagList)];

}


filterByTag(tag: any) {

    this.selectedTag = tag;
    this.newJobList = this.galleryJobsList.filter((job: any) => {
      return job.tags.includes(tag);
    });

}


  protected readonly getPhotosFromStorage = getPhotosFromStorage;
  protected readonly imageURL = imageURL;


  protected readonly blur = blur;
  protected readonly style = style;
  protected readonly userIsLogged = userIsLogged;


  protected readonly event = event;
  protected readonly self = self;
}
