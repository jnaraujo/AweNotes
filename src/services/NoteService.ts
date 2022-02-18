import { firestore } from "./firebase"
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore"

type Note = {
  title: string
  text: string
  createdAt: Date
  author: {
    name: string
    email: string
  }
}

const db = collection(firestore, "notes")

export async function getNote(id: string) : Promise<Note> {
  const docRef = doc(firestore, "notes", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data() as Note;
}

export async function createNote(note: Note){
  const docRef = await addDoc(db, note);
  return docRef.id;
}