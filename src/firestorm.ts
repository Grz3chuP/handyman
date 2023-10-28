// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore, query, collection, getDocs, addDoc,deleteDoc,doc,updateDoc} from "firebase/firestore";
import {getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import {signal, WritableSignal} from "@angular/core";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { jobListTemplate} from "./models/joblist";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export let userIsLogged = signal(false);
export let imageURL: any = [];
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoKBazhreUEtznH-Z81qTwABduivXyCeU",
  authDomain: "voytech-2775a.firebaseapp.com",
  projectId: "voytech-2775a",
  storageBucket: "voytech-2775a.appspot.com",
  messagingSenderId: "88480493260",
  appId: "1:88480493260:web:8a88e75a8152df88e25c69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const q = query(collection(db, 'jobs'));

export async function getJobsList() {
  const querySnapshot = await getDocs(q);
  const jobs: any = [];
  querySnapshot.forEach((doc) => {
    jobs.push(doc.data());
    jobs.id = doc.id;
  });
  console.log(jobs);
  return jobs;
}


export async function addJobToFirestore(object: any) {
  const collectionRef = collection(db, 'jobs');
  try {
 if (object.before !== null) {

   const docRef = await addDoc(collectionRef, {id: object.id, title: object.title, description: object.description,img: object.img, imgUrl: object.imgUrl, before: object.before, beforeUrl: object.beforeUrl, opacity: object.opacity, blurMod: object.blurMod, tags: object.tags, isCompare: object.isCompare} );
    await updateDoc(doc(collectionRef, docRef.id), {
      id: docRef.id,
    });

   alert('dodano'+ docRef);
 } else {
   const docRef = await addDoc(collectionRef, {id: object.id, title: object.title, description: object.description,img: object.img, imgUrl: object.imgUrl, before: object.before, beforeUrl: object.beforeUrl, opacity: object.opacity, blurMod: object.blurMod, tags: object.tags, isCompare: object.isCompare} );
   await updateDoc(doc(collectionRef, docRef.id), {
     id: docRef.id,
   });
   alert('dodano'+ docRef);}

  } catch (e: any) {
    alert(e.message)
  }
}

const auth = getAuth(app);

export async function login(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;

  } catch (error: any) {
    alert(error.message)
    return null;
  }
}

export const checkUserIsLogin = async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('zalogowany' + user.email);
      userIsLogged.set(true);
      console.log(userIsLogged);

    } else {
      console.log('niezalogowany');
      userIsLogged.set(false);
    }
  });
}

checkUserIsLogin();


export const logout = async () => {
  try {
    await signOut(auth);
    userIsLogged.set(false);
    console.log(userIsLogged);
  } catch (error) {
    console.log(error);
  }
}
// dodawanie zdjecia do storage firebase
const storage = getStorage(app);
export async function addPhotoToStorage(file: any) {
  let storageRef = ref(storage, "images/"+file.name);

  try {
    const task = await uploadBytes(storageRef, file);

         console.log('tutaj musze' + task);

    alert('zdjecie dodane')
  } catch (e: any) {
    alert(e.message)
  }
  }
export async function getPhotosFromStorage() {
  const listRef = ref(storage, 'images');
  const result = await listAll(listRef).then((res) => { return res.items });
  if (imageURL.length === 0) {
    result.forEach((itemRef) => {

      getDownloadURL(itemRef).then((url) => {
        imageURL.push({url: url,name: itemRef.name});
      })
    });
  }
  console.log('Foteczki z Firestora' + result);
  console.log('Foteczki ' + imageURL);

  // return result;
     return imageURL;
}

//delete photo from storage
 export async function deletePhotoFromStorage(file: any) {
  let storageRef = ref(storage, "images/"+ file);

  try {
   await deleteObject(storageRef).then(() => {
     alert('zdjecie dodane')
   });

  } catch (e: any) {
    alert(e.message)
  }
  console.log('Uploaded a blob or file!');
 }

 //remove job from firestore
  export async function removeJobFromFirestore(id: any) {
  const collectionRef = collection(db, 'jobs');

try {
  await deleteDoc(doc(collectionRef, id));
  alert('usunieto');
} catch (e: any) {
  alert(e.message);
}


  }
