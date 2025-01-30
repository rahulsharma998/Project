import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import firebaseApp from './firebase.js';

const auth = getAuth(firebaseApp);

export const signUp = async (email, password, fullName, phone) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("User Registered:", fullName,phone)
  } catch (error) {
    throw new Error(error.message);
  }
};

export const signIn = async (email, password) => {
  try {
     await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
    throw new Error(error.message);
  }
};

export const googleSignIn=async()=>{
    const provider= new GoogleAuthProvider();
    try {
        const result=await signInWithPopup(auth, provider);
        const user= result.user;
        console.log("Google Sign-in Successful:",user)
    } catch (error) {
        throw new Error(error.message)
    }
};