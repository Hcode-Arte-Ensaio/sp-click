import { collection, getDocs } from "firebase/firestore/lite";
import { database, storage } from "../../firebaseConfig";
import { getBlob, getDownloadURL, getStorage, list, ref } from "firebase/storage";

export async function getCollection(name, setState) {
  const cols = collection(database, name);
  const snapshot = await getDocs(cols);
  const list = snapshot.docs.map((doc) => doc.data());
  setState(list);
}

export async function pageTokenExample() {
  const storage = getStorage();
  const listRef = ref(storage, "masp/masp-1.jpg");
  const firstPage = await getDownloadURL(listRef);
  console.log(firstPage);
}
