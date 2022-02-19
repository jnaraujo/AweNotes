import { Grid, Menu, MenuItem, Tooltip } from "@mui/material";

import { useTheme } from "@context/ThemeContext";
import { useEffect, useRef, useState } from "react";

import { GoPlus } from 'react-icons/go';
import { IoMdShareAlt } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { useRouter } from "next/router";

import { toast, ToastContainer } from 'react-toastify';

import AweModal from "./AweModal";
import { useAuth } from "@context/AuthContext";

// UTILS
import Sanitize from "src/utils/Sanitize";


export default function Note(props : {
    title: string,
    text: string,
    author: {
        name: string,
        id: string
    },
    isSaved: boolean,
    isLoading?: boolean | false,
    isEditable: boolean | false,
    onDelete?: () => void,
    onEditorUpdate?: (editor: {
        title: string,
        text: string
    })=> void,
    onSave?: (editor: {
        title: string,
        text: string
    })=> void
}) {
    const { theme } = useTheme();
    const [isOwned, setIsOwned ] = useState(false);

    const [isSaved, setIsSaved] = useState(props.isSaved);

    const { user } = useAuth();

    const [editor, setEditor] = useState({
        title: props.title,
        text: props.text,
    });

    // REFS
    const titleRef = useRef(null);
    const textRef = useRef(null);

    const [modal, setModal] = useState({
        isOpen: false,
        title: "",
        content: "",
        mdType: "",
        onClick: (event: any)=> {},
    });

    const router = useRouter();

    function handleShare(){
        const shareData = {
            title: "📝 AweNotes",
            text: "Escreva suas ideias e compartilhe com o mundo. Totalmente grátis, fácil e sem limites.",
            url: router.asPath,
        }
        try {
            navigator.share(shareData);
        } catch(err) {
            toast.error('Erro ao tentar compartilhar', {
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
    function handleDelete(){
        setModal({
            isOpen: true,
            title: "Você tem certeza?",
            content: "A ação de apagar a nota não poderá ser desfeita.",
            mdType: "delete",
            onClick: (event)=>{
                console.log(event)
                if(event.type == "delete"){
                    if(props.onDelete){
                        props.onDelete();
                    }
                }
                setModal({
                    isOpen: false,
                    title: "",
                    content: "",
                    mdType: "",
                    onClick: ()=>{},
                })
            }
        })
    }

    function handleSave(){
        if(props.onSave){
            props.onSave({
                title: titleRef.current.innerText,
                text: textRef.current.innerHTML,
            });
        }
        // setIsSaved(true);
    }

    useEffect(()=>{
        function beforeUnloadListener(event: any) {
            event.preventDefault();
            return event.returnValue = "Algumas alterações ainda não foram salvas.";
        }
        const editorData = {
            title: titleRef.current.innerText,
            text: textRef.current.innerHTML
        }

        // if(window){
        //     window.addEventListener("beforeunload", beforeUnloadListener, {capture: true});
        // };

        const timeOutId = setTimeout(() => {

            // if(window){
            //     window.removeEventListener("beforeunload", beforeUnloadListener, {capture: true});
            // }

            const editorData = {
                title: titleRef.current.innerText,
                text: textRef.current.innerHTML
            }

            setEditor(editorData);
        }, 2000);
        return () => {
            clearTimeout(timeOutId)
            if(window){
                // window.removeEventListener("beforeunload", beforeUnloadListener, {capture: true});
            }
        };
    }, [titleRef, textRef, isSaved]);

    useEffect(()=>{
        if(user){
            if(user.id == props.author.id){
                setIsOwned(true);
            }else{
                setIsOwned(false);
            }
        }else{
            setIsOwned(false);
        }
    },[props.author.id, user])

    useEffect(()=>{
        setIsSaved(props.isSaved);
    }, [props.isSaved])

    function handleEditorChange(e) {
        const editorText = textRef.current?.value;
        const editorTitle = titleRef.current?.value;
        setEditor({
            title: editorTitle,
            text: editorText,
        });
    }

    return (
        <div className={`note ${props.isEditable ? "isEditable" : null} ${props.isLoading ? "loading" : null}`}>
            <Grid container justifyContent={"center"} alignItems={"center"}>
                <Grid item xs={12}>
                    <h1 ref={titleRef} placeholder="título da nota..." suppressContentEditableWarning={true} contentEditable={props.isEditable} onKeyPress={handleEditorChange}>
                        {props.title}
                    </h1>
                    <div className="bar">
                        <div className="author">
                            by: <span>{props.author?.name ? props.author.name.split(" ")[0] : "you"}</span>
                        </div>
                        <div className="tools">
                            {
                                isOwned ? (
                                    <>
                                        <div className="save tool">
                                            <Tooltip title="Save" placement="top">
                                                <div onClick={handleSave}>
                                                    <GoPlus size={25} />
                                                </div>
                                            </Tooltip>
                                        </div>

                                        {
                                            isSaved == true ? (
                                                <div className="tool share">
                                                    <Tooltip title="Share" placement="top">
                                                        <div onClick={handleShare}>
                                                            <IoMdShareAlt size={30} />
                                                        </div>
                                                    </Tooltip>
                                                </div>
                                            ) :
                                            null
                                        }
                                        
                                        <div className="tool delete">
                                            <Tooltip title="Delete" placement="top">
                                                <div onClick={handleDelete}>
                                                    <MdDelete size={25 } />
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="tool share">
                                            <IoMdShareAlt size={30} />
                                        </div>
                                    </>
                                )
                            }
                            
                        </div>
                    </div>
                    <div className="line"></div>
                    <p ref={textRef} onKeyPress={handleEditorChange} className="text" placeholder="escreva suas idaias..." dangerouslySetInnerHTML={{
                        __html: Sanitize(props.text)
                    }} contentEditable={props.isEditable} suppressContentEditableWarning={true}>
                    </p>
                </Grid>
            </Grid>
            <AweModal modalInfo={modal} />
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
            <style jsx global>{`
                .note{
                    .bar{
                        .tools{
                            .tool{
                                svg{
                                    fill: ${theme.pallet.title};
                                }
                            }
                        }
                    }
                }
            `}</style>
            <style jsx>{`
                .note{
                    &.loading{
                        *{
                            color: transparent !important;
                        }
                        h1, .text{
                            &[placeholder]:empty:before{
                                font-style: italic;
                                color: transparent !important;
                            }
                            animation: FadeIn 0.75s ease-in-out infinite alternate;
                        }
                        .author{
                            color: transparent !important;

                            animation: FadeIn 0.75s ease-in-out infinite alternate;
                        }
                        .text{
                            min-height: 600px;
                        }

                        @keyframes FadeIn {
                            from {
                                background-color: rgb(182, 182, 182);
                            }
                            
                            to {
                                background-color: rgb(204, 202, 202);
                            }
                        }
                    }
                    &.isEditable{
                        h1, .text{
                            cursor: text;
                        }
                    }
                    width: 100%;
                    height: 100%;
                    /* margin: 0;
                    padding: 0; */
                    /* background-color: blue; */
                    text-align: left;
                    font-family: ${theme.font.family};
                    *{
                        margin: 0;
                        padding: 0;
                    }
                    
                    h1{
                        color: ${theme.pallet.title};
                        @media (min-width: 900px) {
                            font-size: 40px;
                        }
                    }

                    h1, .text{
                        &[placeholder]:empty:before{
                            content: attr(placeholder);
                            font-style: italic;
                            color: ${theme.pallet.textPlaceholder};
                        }
                        &:focus{
                            outline: none;
                        }
                    }
                    .line{
                        width: 100%;
                        height: 1px;
                        margin: 8px 0 16px 0;

                        background-color: ${theme.pallet.text};
                        opacity: 0.4;
                    }
                    .bar{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        align-content: center;
                        
                        width: 100%;

                        .tools{
                            display: flex;
                            justify-content: flex-end;
                            align-items: center;
                            justify-content: space-evenly;
                            /* width: 150px; */
                            .tool{
                                cursor: pointer;
                                margin-left: 16px;

                                transition: transform linear .2s;
                            }
                            .tool:hover{
                                /* opacity: 0.8; */
                                transform: scale(1.3);
                            }
                        }
                        .author{
                            color: ${theme.pallet.text};
                            font-weight: 500;
                            font-size: 18px;

                            /* margin-top: 2px; */

                            span{
                                font-weight: 600;
                            }
                        }
                    }
                    
                    .text{
                        color: ${theme.pallet.text};
                        font-size: 20px;
                        font-weight: 500;
                        min-height: 100px;
                    }

                }
                `}</style>
        </div>
    )
}