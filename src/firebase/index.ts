import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FirebaseError } from 'firebase/app';
import { NextOrObserver, User, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore/lite';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { auth, database } from '../../firebaseConfig';

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

export function handleSignIn(email: string, password: string) {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  signInWithEmailAndPassword(auth, email, password)

    .then((_data) => {
      Alert.alert('Login', 'Login realizado com sucesso', [
        { text: 'Voltar para o início', onPress: () => navigation.replace('Home') },
      ]);
    })
    .catch((error: FirebaseError) => {
      console.log({ errorCode: error.code, errorMessage: error.message });
      Alert.alert('Falha no Login', 'Verifique seu email ou senha e tente novamente');
    });
}

