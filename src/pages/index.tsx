import styles from '@styles/Home.module.scss';

import React, { useEffect, useRef, useState } from 'react';

import { DefaultSeo } from 'next-seo';
import { Grid } from '@mui/material';

import { useRouter } from 'next/router';

import { BsPencilFill } from 'react-icons/bs';
import { IoMdShareAlt } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';
import Navbar from 'src/components/Navbar';


// COMPONENTS

export default function Home() {
  return (
    <>
    <DefaultSeo
      title="Teste de Leiturabilidade"
      description="Saiba em tempo real e de graça o quão fácil de ser lido seu texto é."
      additionalLinkTags={
        [
            {
                rel: "icon",
                href: "/images/minified/favicon.webp",
            }
        ]
      }
    />
    <div className={styles.home}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
    </div>
    </>
  )
}
