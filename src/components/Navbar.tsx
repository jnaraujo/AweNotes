import { Grid, Menu, MenuItem, Tooltip } from "@mui/material";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "src/context/ThemeContext";

import { BsLightbulbFill, BsLightbulb } from "react-icons/bs";
import { IoMdPerson } from "react-icons/io"
import { BiNote } from "react-icons/bi";
import { useState } from "react";

import { useAuth } from '@context/AuthContext';
import { useRouter } from "next/router";

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    
    const { user, login, logout } = useAuth();

    const router = useRouter();

    const [openLoginMenu, setOpenLoginMenu ] = useState(false);
    const [openProfileMenu, setOpenProfileMenu ] = useState(false);
    
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    function handleClose(){
        setOpenLoginMenu(false);
        setOpenProfileMenu(false);
        setAnchorEl(null);
    }

    async function changeTheme() {
        if (theme.name === "light") {
            const { darkTheme } = (await import('./../theme'))
            setTheme(darkTheme);
        }else{
            const { lightTheme } = (await import('./../theme'))
            setTheme(lightTheme);
        }
      }

    return (
        <div className="navbar">
            <Grid container justifyContent={"center"} alignItems={"center"}>
                <Grid item xs={3} className="left">
                    <div className="themeChange" onClick={changeTheme}>
                        {
                            theme.name === "light" ?
                            <BsLightbulb size={25} /> :
                            <BsLightbulbFill size={25} />
                        }
                    </div>
                </Grid>
                <Grid item xs={5} lg={5}>
                    <h1>
                        <Link href="/" passHref>
                            <a>📝 AweNotes</a>
                        </Link>
                    </h1>
                </Grid>
                <Grid item xs={3} className="right" >
                    {
                        user.id ? (
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <Tooltip title="Criar nota" placement="bottom">
                                    <div className="criarNota" onClick={()=>{
                                        router.push("/new")
                                    }}>
                                        <BiNote size={25} />
                                    </div>
                                </Tooltip>
                                <div className="login" style={{ cursor: "pointer", borderRadius: "50px", overflow: 'hidden' }} onClick={(event)=>{
                                        if(event.currentTarget){
                                            setAnchorEl(event.currentTarget);
                                            setOpenProfileMenu(true);
                                        }
                                    }}>
                                    <Image alt='User profile pic' src={user.avatar} width={40} height={40}></Image>
                                </div>
                            </div>
                        ) : (
                            <div className="login" style={{
                                cursor: "pointer"
                            }} onClick={(event)=>{
                                    if(event.currentTarget){
                                        setAnchorEl(event.currentTarget);
                                        setOpenLoginMenu(true);
                                    }
                                }}>
                                <IoMdPerson size={25} />
                            </div>
                        )
                    }
                    <Menu open={openProfileMenu} anchorEl={anchorEl} onClose={handleClose} >
                        <MenuItem onClick={()=>{
                            handleClose();
                            logout();
                        }}>  
                            Log out
                        </MenuItem>
                    </Menu>
                    <Menu open={openLoginMenu} anchorEl={anchorEl} onClose={handleClose} >
                        <MenuItem onClick={()=>{
                            handleClose();
                            login();
                        }}>  
                            Log in
                        </MenuItem>
                    </Menu>
                </Grid>
            </Grid>
            <style jsx>{`
                .navbar{
                    margin: 0;
                    padding: 0;

                    padding: 8px 0;

                    @media (min-width: 900px) {
                        padding: 16px 0;
                    }

                    text-align: center;

                    font-family: ${theme.font.family};

                    h1{
                        color: ${theme.pallet.primary};
                        font-size: 20px;
                    }
                    .criarNota{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        
                        font-family: Inter;
                        background-color: ${theme.pallet.primary};
                        color: ${theme.pallet.background};
                        font-weight: 500;
                        font-size: 16px;

                        border-radius: 10px;
                        padding: 6px;

                        cursor: pointer;

                        margin-right: 10px;

                        @media (min-width: 900px) {
                            margin-right: 20px;
                        }
                    }
                    .themeChange{
                        display: flex;
                        justify-content: right;
                        align-items: center;

                        cursor: pointer;
                        transition: transform linear .2s;
                        
                        &:hover{
                            transform: scale(1.1);
                        }
                    }
                    .login{
                        display: flex;
                        justify-content: right;
                        align-items: center;

                        width: fit-content;
                        cursor: pointer;
                    }
                }
                `}</style>
            <style jsx global>{`
                .navbar{
                    .left{
                        display: flex;
                        justify-content: flex-start;
                    }
                    .right{
                        display: flex;
                        justify-content: flex-end;
                    }
                    .login{
                        svg{
                            fill: ${theme.pallet.primary};
                        }
                    }
                    .themeChange{
                        svg{
                            ${theme.name === "dark" ? 'fill: #ffc300' : `fill: ${theme.pallet.primary}`}
                        }
                    }
                }
            `}</style>
        </div>
    )
}