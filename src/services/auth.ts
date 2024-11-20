import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const signUpUser = async (email: string, password: string) => {
  const auth = getAuth();
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUser = async (email: string, password: string) => {
  const auth = getAuth();
  return await signInWithEmailAndPassword(auth, email, password);
};
