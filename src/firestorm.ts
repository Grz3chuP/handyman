// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore, query, collection, getDocs} from "firebase/firestore";
import {getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import {signal, WritableSignal} from "@angular/core";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";


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
  });
  console.log(jobs);
  return jobs;
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

    await uploadBytes(storageRef, file);
    alert('zdjecie dodane')
  } catch (e: any) {
    alert(e.message)
  }

  console.log('Uploaded a blob or file!');
}

export async function getPhotosFromStorage() {
  const listRef = ref(storage, 'images');
  const result = await listAll(listRef).then((res) => { return res.items });
  if (imageURL.length === 0) {
    result.forEach((itemRef) => {
      getDownloadURL(itemRef).then((url) => {
        imageURL.push(url)
      })
    });
  }
  console.log('Foteczki z Firestora' + result);
  console.log('Foteczki ' + imageURL);

  // return result;
     return imageURL;
}

