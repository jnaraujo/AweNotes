import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

// UTILS
import Sanitize from "src/utils/Sanitize";

// @types
import { ThemeInterface } from "src/theme"

// CONTEXTS
import { useTheme } from "@context/ThemeContext";


type MicroNoteDivProps = {
    theme: ThemeInterface;
}
const MicroNoteDiv = styled.div<MicroNoteDivProps>`
    background-color: ${props => props.theme.pallet.microNoteBackground};
    /* border: 2px solid ${props => props.theme.pallet.primary}; */
    width: 250px;
    height: 250px;

    padding: 16px;
    border-radius: 15px;

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);

    cursor: pointer;

    *{
        margin: 0;
        padding: 0;
        font-family: Inter, sans-serif;
    }
    h1{
        font-size: 30px;
        margin-top: 16px;;
        color: ${props => props.theme.pallet.title};
    }
    p{
        font-size: 18px;
        margin-top: 8px;
        color: ${props => props.theme.pallet.text};
    }

    margin: 8px;

    &.isLoading{
        h1, p{
            width: 100%;
            animation: FadeIn 0.75s ease-in-out infinite alternate;
        }
        h1{
            min-height: 30px;
        }
        p{
            height: 160px;
        }
    }
    @keyframes FadeIn {
        from {
            background-color: rgb(182, 182, 182);
        }
        
        to {
            background-color: rgb(204, 202, 202);
        }
    }
`;

interface MicroNoteProps {
    title: string;
    text: string;
    url: string;

    isLoading?: boolean | true;
}

export default function MicroNote(props: MicroNoteProps){
    const { theme } = useTheme();
    const router = useRouter();
    function handleNoteClick(){
        router.push(props.url);
    }
    return (
        <MicroNoteDiv theme={theme} title="Abrir nota" onClick={handleNoteClick} className={props.isLoading ? "isLoading" : null}>
            <div>
                <Link href={props.url} passHref>
                    <h1>{props.title}</h1>
                </Link>
                <p dangerouslySetInnerHTML={{
                    __html: Sanitize(`${props.text ? props.text.slice(0, 250) : ""} ${props.text ? ( props.text.length >= 250 ? "..." : "" ) : ""}`)
                }}></p>
            </div>
        </MicroNoteDiv>
    )
}