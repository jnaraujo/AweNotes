import { Grid } from "@mui/material";
import Link from "next/link";
import { useTheme } from "src/context/ThemeContext";

import { BsLightbulbFill, BsLightbulb } from "react-icons/bs";

export default function Navbar() {
    const { theme, setTheme } = useTheme();

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
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={7} lg={5}>
                    <h1>
                        <Link href="/" passHref>
                            <a>📝 AweNotes</a>
                        </Link>
                    </h1>
                </Grid>
                <Grid item xs={2} className="right" >
                    <div className="themeChange" onClick={changeTheme}>
                        {
                            theme.name === "light" ?
                            <BsLightbulb size={25} /> :
                            <BsLightbulbFill size={25} />
                        }
                    </div>
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
                    .themeChange{
                        display: flex;
                        justify-content: right;
                        align-items: center;

                        cursor: pointer;
                        transition: transform linear .2s;

                        animation: lampflicker 2s infinite;
                        
                        &:hover{
                            transform: scale(1.1);
                            
                        }
                    }
                }
                `}</style>
            <style jsx global>{`
                .navbar{
                    .right{
                        display: flex;
                        justify-content: flex-end;
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