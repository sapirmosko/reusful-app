import {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "..";

export async function saveImagesToStorage(file: any, imageId: string) {
  try {
    const type = file.name.split(".")[1];

    const storageRef = ref(storage, `${imageId}.${type}`);

    const snapshot = await uploadBytes(storageRef, file.data);
    let url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (err: any) {
    throw new Error(`Storage upload error: ${err.message}`);
  }
}

export async function deleteImageFromStorage(imageId: string) {
  try {
    const storageRef = ref(storage, imageId);
    const results = await deleteObject(storageRef);
    return results;
  } catch (e) {
    console.log(e);
  }
}
