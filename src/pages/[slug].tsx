import styles from '@styles/Home.module.scss';

import React, { useEffect, useRef, useState } from 'react';

import { DefaultSeo } from 'next-seo';
import { Grid } from '@mui/material';

import 'react-responsive-modal/styles.css';
import { toast, ToastContainer } from 'react-toastify';

// COMPONENTS
import Navbar from '@components/Navbar';
import Note from '@components/Note';

// CONTEXTS
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { useRouter } from 'next/router';

// SERVICES
import { getNote, createNote, deleteNote, updateNote } from '@services/NoteService';

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
  const [isLoading, setIsLoading] = useState(false);

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
      }else{
        const noteData = {
          title: editor.title,
          text: editor.text,
        }
        try{
          updateNote(String(slug), noteData);
          toast.success('Nota salva com sucesso!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
        }catch(err){
          toast.error('Erro ao atualizar nota', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
        }
      }
    }
  }

  async function handleOnDelete(){
    try{
      const deleteNoteResult = await deleteNote(String(slug));
      router.push('/');
    }catch(error){
      toast.error('Erro ao tentar apagar a nota', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  }

  useEffect(()=>{ 
    if(slug == "new"){
      setIsLoading(false);
      setNote({
        title: "",
        text: "",
        isSaved: false,
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
      setIsLoading(true);
      getNote(String(slug)).then(note => {
        if(!note){
          return;
        }
        setIsLoading(false);
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
  }, [slug, user.email])

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
              }}
              isEditable={note.isEditable}
              onEditorUpdate={handleEditorUpdate}
              onDelete={handleOnDelete}
              isSaved={note.isSaved}
              onSave={handleSave}
              isLoading={isLoading}
              ></Note>
          </div>
        </Grid>
      </Grid>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
      />
    </div>
    </>
  )
}
