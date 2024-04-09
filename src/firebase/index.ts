import { FirebaseError } from 'firebase/app';
import {
  NextOrObserver,
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { auth, database, db } from '../../firebaseConfig';
import { PlaceType } from '../types';

export async function getCollection(name: string) {
  const cols = collection(database, name);
  const snapshot = await getDocs(cols);
  const list = snapshot.docs.map((doc) => doc.data());
  return list;
}

export async function getImageDownloadURL(path: string) {
  const storage = getStorage();
  const listRef = ref(storage, path);
  const firstPage = await getDownloadURL(listRef);
  // console.log(firstPage);
  return firstPage;
}

export function verifyUser(observer: NextOrObserver<User>) {
  onAuthStateChanged(auth, observer);
}

export function useUser() {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    verifyUser((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
  }, []);

  return user;
}

export function handleSignIn(email: string, password: string, onConfirm: () => void) {
  signInWithEmailAndPassword(auth, email, password).catch((error: FirebaseError) => {
    console.log({ errorCode: error.code, errorMessage: error.message });
    Alert.alert('Falha no Login', 'Verifique seu email ou senha e tente novamente');
  });
}

export function handleDelete(onSuccess: () => void) {
  Alert.alert('Deseja deletar sua conta?', 'Essa ação é irreversível', [
    {
      text: 'Cancelar',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: () => {
        auth.currentUser
          .delete()
          .then(onSuccess)
          .catch((error: FirebaseError) => {
            console.log({ errorCode: error.code, errorMessage: error.message });
            Alert.alert('Falha ao deletar', 'Não foi possível deletar sua conta no momento.');
          });
      },
    },
  ]);
}

export async function addLike(userId: string, place: PlaceType) {
  await updateDoc(doc(db, 'places', String(place.id)), {
    usersLikes: [...place.usersLikes, userId],
  });
}

export async function removeLike(userId: string, place: PlaceType) {
  await updateDoc(doc(db, 'places', String(place.id)), {
    usersLikes: place.usersLikes.filter((likes) => likes !== userId),
  });
}
