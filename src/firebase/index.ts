import { collection, getDocs } from 'firebase/firestore/lite';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { database } from '../../firebaseConfig';

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
