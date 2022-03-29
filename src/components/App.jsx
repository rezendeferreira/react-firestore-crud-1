import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { db } from "../firebase-config";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";


function App() {

  //hook
  const [notes, setNotes] = useState([]);

  //less typing later, creating ref to firebase collection
  const usersCollectionRef = collection(db, "notes")

  //get notes from firebase-db on load and/or change in collection
  useEffect(
    () =>
      onSnapshot(collection(db, "notes"), (snapshot) =>
        setNotes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  // new note
  const createNote = async (note) => {
    console.log("following notes been added:", note);
    await addDoc(usersCollectionRef, { title: note.title, content: note.content })
  }

  // update note
  const updateNote = async (note, id) => {
    console.log("updating", id, "to:", note);
     updateDoc(usersCollectionRef, { title: note.title, content: note.content})
  }
  
  //delete note
  const deleteNote = async (id) => {
    console.log("deleted document`s id:", id);
    await deleteDoc(doc(usersCollectionRef, id));
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={createNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onUpdate={updateNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;

