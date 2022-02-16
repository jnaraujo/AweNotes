import { Grid } from "@mui/material";
import Link from "next/link";
import { useTheme } from "src/context/ThemeContext";

export default function Navbar() {
    const { theme } = useTheme();

    return (
        <div className="navbar">
            <Grid container justifyContent={"center"} alignItems={"center"}>
                <Grid item xs={6}>
                    <h1>
                        <Link href="/" passHref>
                            <a>notes</a>
                        </Link>
                    </h1>
                </Grid>
            </Grid>
            <style jsx>{`
                .navbar{
                    margin: 0;
                    padding: 0;
                    background-color: orange;

                    text-align: center;

                    font-family: ${theme.font.family};
                }
                `}</style>
        </div>
    )
}