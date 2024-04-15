import { FirebaseError } from 'firebase/app';
import {
  NextOrObserver,
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
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
      // onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'SIM',
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

export async function updateDisplayName(newName: string, onSuccess: () => void) {
  updateProfile(auth.currentUser, { displayName: newName })
    .then(onSuccess)
    .catch((e) => console.error(e));
}

// todo: atualizar a bio do usuario no firebase database
export async function updateUserBio(bioText: string) {
  console.log(bioText);
}

// todo: enviar a imagem para o firestore e salvar a url no user.photoURL
export async function updateUserUrlPhoto(onSuccess: (newUrl: string) => void) {
  // escolha a foto
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  updateProfile(auth.currentUser, { photoURL: result.assets[0].uri })
    .then(() => {
      onSuccess(result.assets[0].uri);
    })
    .catch((e:Error) => console.error(e.message));

  // onSuccess(files.assets[0].uri);
  // fazer upload para o firestore
  // recarregar o user na tela
}
