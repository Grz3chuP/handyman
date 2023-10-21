import {Component, signal} from '@angular/core';
import {getJobsList, getPhotosFromStorage, imageURL} from "../../firestorm";


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
    jobsList.forEach((job: any) => {
      photoList.forEach((photo: any) => {
        if (job.img === photo.name) {
          job.img = photo.url;
        }
      })
    })

    console.log(jobsList);
    console.log(photoList);
    this.galleryJobsList = jobsList;
    return jobsList;

 }

displayGalleryItems() {

  //  return newGalleryList;
}

  protected readonly getPhotosFromStorage = getPhotosFromStorage;
  protected readonly imageURL = imageURL;
}