import styles from '@styles/Home.module.scss';

import React, { useEffect, useRef, useState } from 'react';

import { DefaultSeo } from 'next-seo';
import { Grid } from '@mui/material';
import { v4 } from 'uuid';


import 'react-responsive-modal/styles.css';

// COMPONENTS
import Navbar from '@components/Navbar';
import Note from '@components/Note';

// CONTEXTS
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { useRouter } from 'next/router';

// SERVICES
import { getNote, createNote } from '@services/NoteService';

export default function Home() {
  const router = useRouter();
  const { query: { slug } } = router;

  const {theme} = useTheme();
  const { login, user } = useAuth();
  
  const [note, setNote] = useState({
    title: '',
    text: '',
    author: {
      name: '',
      email: ''
    },
    isSaved: true,
    isEditable: false
  });

  async function handleEditorUpdate(editor){
    if(slug != "new") return;

    if( (editor.title && editor.text) != "" && user.email){
      const noteData = {
        title: editor.title,
        text: editor.text,
        createdAt: new Date(),
        author: {
          name: user.name,
          email: user.email
        }
      }
      console.log(noteData);
    }
  }


  async function handleSave(editor){
    if((editor.title && editor.text) != "" && user.email){
      if(slug == "new"){
        const noteData = {
          title: editor.title,
          text: editor.text,
          createdAt: new Date(),
          author: {
            name: user.name,
            email: user.email
          }
        }
        const noteId = await createNote(noteData);
        router.push(`/${noteId}`);
      }
    }
  }

  useEffect(()=>{
    if(slug == "new"){
      setNote({
        title: "",
        text: "",
        isSaved: true,
        author: {
          name: user.name ? user.name : "",
          email: user.email ? user.email : ""
        },
        isEditable: true
      })
    }else{
      const noteId = String(slug);
    }
  }, [slug, user])

  useEffect(()=>{
    if(slug != "new"){
      getNote(String(slug)).then(note => {
        if(!note){
          return;
        }
        setNote({
          title: note.title,
          text: note.text,
          isSaved: true,
          author: {
            name: note.author.name,
            email: note.author.email
          },
          isEditable: note.author.email == user.email ? true : false
        })
      });
    }
  }, [slug])

  return (
    <>
    <DefaultSeo
      title="📝 AweNotes - Escreva suas ideias e compartilhe com o mundo."
      description="Escreva suas ideias e compartilhe com o mundo. Totalmente grátis, fácil e sem limites."
      additionalLinkTags={
        [
            {
                rel: "icon",
                href: "/images/minified/favicon.webp",
            }
        ]
      }
    />
    <div className={styles.home} style={{
        backgroundColor: `${theme.pallet.background}`,
    }}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <Grid container justifyContent={"center"} className={styles.note_container}>
        <Grid item xs={11} md={6} lg={5}>
          <div className={styles.note}>
            <Note title={note.title} text={note.text} author={{
                name: note.author.name,
                email: note.author.email
              }} isEditable={note.isEditable} onEditorUpdate={handleEditorUpdate} isSaved={note.isSaved} onSave={handleSave}></Note>
          </div>
        </Grid>
      </Grid>
    </div>
    </>
  )
}
