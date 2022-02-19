import styles from '@styles/Home.module.scss';

import React, { useEffect, useRef, useState } from 'react';

import { DefaultSeo } from 'next-seo';
import { Grid } from '@mui/material';

import 'react-responsive-modal/styles.css';
import { toast, ToastContainer } from 'react-toastify';

// COMPONENTS
import Navbar from '@components/Navbar';
import MicroNote from '@components/MicroNote';

// CONTEXTS
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { useRouter } from 'next/router';

// SERVICES
import { deleteNote, getNotes } from '@services/NoteService';

// TYPES
// import { UserType } from "@types/UserTypes";

export default function Home() {
  const router = useRouter();

  const {theme} = useTheme();
  const { login, user } = useAuth();
  
  const [notes, setNotes] = useState([{} as {
    title: string;
    text: string;
    id: string;
    author: {
      name: string;
      id: string;
    }
  }]);
  const [isLoading, setLoading] = useState(true);

  async function handleOnDelete(id: string) {
    try{
      const deleteNoteResult = await deleteNote(String(id));
      setNotes(notes.filter(note => note.id !== id));
      toast.success('Nota deletada com sucesso.');
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

  useEffect(() => {
    setLoading(true);
    if(user.id){
      getNotes(user.id).then(notes => {
        setNotes(notes);
        setLoading(false);
      })
    }else{
      login();
    }
  }, [user.id]);

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
      <Grid container justifyContent={"left"} className={styles.notes_container}>
        {
          isLoading == false ?
              (notes.filter(note=> note.id && note.id != "").map(note => (
                <div key={note.id}>
                  <MicroNote title={note.title} text={note.text} url={`/${note.id}`} isLoading={false} />
                </div>
                
              )))
            :
            (
              <>
                <div key="123">
                  <MicroNote title={""} text={""} url={`/`} isLoading={true} />
                </div>
                <div key="4234">
                  <MicroNote title={""} text={""} url={`/`} isLoading={true} />
                </div>
                <div key="5345">
                  <MicroNote title={""} text={""} url={`/`} isLoading={true} />
                </div>
              </>
            )
        }
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
