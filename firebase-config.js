// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "socialspark.firebaseapp.com",
  projectId: "socialspark",
  storageBucket: "socialspark.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  LinkedInAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc 
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Auth providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const githubProvider = new GithubAuthProvider();

// User profile functions
async function updateUserProfile(userId, data) {
  try {
    await setDoc(doc(db, 'users', userId), data, { merge: true });
    if (data.photoURL) {
      await updateProfile(auth.currentUser, { photoURL: data.photoURL });
    }
    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    return false;
  }
}

async function getUserProfile(userId) {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
}

// Social media post functions
async function createPost(userId, postData) {
  try {
    const postsRef = collection(db, 'posts');
    await setDoc(doc(postsRef), {
      userId,
      ...postData,
      createdAt: new Date().toISOString(),
      likes: 0,
      shares: 0
    });
    return true;
  } catch (error) {
    console.error('Error creating post:', error);
    return false;
  }
}

// File upload function
async function uploadProfileImage(userId, file) {
  try {
    const storageRef = ref(storage, `profile_images/${userId}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    await updateUserProfile(userId, { photoURL: downloadURL });
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}

export { 
  auth,
  db,
  storage,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  googleProvider,
  facebookProvider,
  twitterProvider,
  githubProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  updateUserProfile,
  getUserProfile,
  createPost,
  uploadProfileImage
}; 