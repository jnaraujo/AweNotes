
import { useTheme } from '@context/ThemeContext';
import { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';


export default function AweModal({modalInfo}:{
    modalInfo: {
        title?: string,
        content?: string,
    
        isOpen?: boolean,
    
        mdType?: string,
    
        onClick?: (event : any) => any,
    }
}){
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);

    const [modalMessage, setModalMessage] = useState({
        title: modalInfo.title,
        content: modalInfo.content,
    });
    const [secondButton, setSecondButton] = useState({
        value: "Fechar",
        onClick: ()=>{},
        className: "close",
    } as {
        value:string,
        onClick: any,
        className:string
    });

    const [firstButton, setFirstButton] = useState({
        value: "Fechar",
        onClick: ()=>{},
        className: "close",
    } as {
        value:string,
        onClick: any,
        className:string
    });

    function handleClose(){
        modalInfo.onClick({
            type: "cancel"
        })
    }

    useEffect(() => {
        setOpen(modalInfo.isOpen);

        if(modalInfo.title != ""){
            setModalMessage({
                title: modalInfo.title,
                content: modalInfo.content,
            });
        }

        if(modalInfo.mdType == "delete"){
            setFirstButton({
                value: "Cancelar",
                onClick: ()=>{
                    modalInfo.onClick({
                        type: "cancel"
                    })
                },
                className: "cancel",
            })
            setSecondButton({
                value: "Apagar",
                onClick: ()=>{
                    modalInfo.onClick({
                        type: "delete"
                    })
                },
                className: "delete",
            })
        }
        
    }, [modalInfo])

    return (
        <div>
            <Modal open={open} onClose={handleClose} center>
                <div className={"modal"}>
                    <div className={"message"}>
                        <h1>
                            {modalMessage.title}
                        </h1>
                        <p dangerouslySetInnerHTML={{
                            __html: modalMessage.content
                        }}>
                        </p>
                    </div>
                    <div className={"line"}></div>
                    <div className={"buttons"}>
                        <button className={firstButton.className} onClick={firstButton.onClick}>{firstButton.value}</button>

                        {
                            secondButton.value ? (<>
                            <button className={secondButton.className} onClick={secondButton.onClick}>{secondButton.value}</button>
                            </>): null
                        }
                    </div>
                </div>
            </Modal>
            
            <style jsx>{`
             .modal{
                padding: 16px 8px;
                max-width: 500px;
                .message{
                    font-family: 'Montserrat', sans-serif;
                    h1{
                        margin-top: 16px;
                        font-size: 24px;
                        font-weight: 700;
                        margin-bottom: 8px;

                        @media (min-width: 900px) {
                            font-size: 32px;
                        }
                    }
                    p{
                        font-size: 18px;
                        font-weight: 500;
                        margin-bottom: 24px;
                        img{
                            width: calc(100% - 16px);
                            height: auto;
                            border: 2px dashed black;
                            margin-top: 16px;
                            padding: 8px;
                        }
                        @media (min-width: 900px) {
                            font-size: 20px;
                        }
                    }
                    color: black;
                }
                .line{
                    width: 100%;
                    border-top: 1px solid black;
                    margin: 16px 0;
                }
                .buttons{
                    font-family: 'Montserrat', sans-serif;
                    margin-top: 24px;
                    display: flex;
                    justify-content: space-between;

                    button{
                        width: 100%;
                        &:not(:only-child){
                            width: 45%;
                        }
                        font-weight: 600;
                        font-size: 15px;
                        cursor: pointer;
                        padding: 10px 10px;

                        height: 40px;
                        border-radius: 5px;

                        color: white;

                        border: none;
                        
                        transition: background .3s ease-in-out;

                        display: flex;
                        align-items: center;
                        justify-content: center;

                        &:focus{
                            outline: none;
                        }
                    }
                    button.delete{
                        background-color: #ef233c;
                        color: #F8F9FA;
                        
                        border: none;
                        &:hover{
                            background-color: transparent;
                            color: #ef233c;

                            border: 2px solid #ef233c;
                        }
                    }
                    button.cancel{
                        background-color: transparent;

                        color: #161616;
                        transition: background-color 0.2s ease-in-out;
                        border: 2px solid #161616;
                        &:hover{
                            background-color: #161616;
                            color: #F8F9FA;

                            border: none;
                        }
                    }
                }
            }
            `}</style>
        </div>
    )
}