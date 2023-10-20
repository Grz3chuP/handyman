import {Component, signal} from '@angular/core';
import {getJobsList, getPhotosFromStorage, imageURL} from "../../firestorm";


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  photoList: any[any] =  getPhotosFromStorage() ;
 async getGalleryItems() {
    const jobsList = await getJobsList();
    console.log(jobsList);

  }



  protected readonly getPhotosFromStorage = getPhotosFromStorage;
  protected readonly imageURL = imageURL;
}
