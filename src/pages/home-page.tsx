import { useNavigate } from "react-router";
import { NavBar } from "../components/NavBar"


export function HomePage(){
    const router = useNavigate();
    return<>
        <NavBar left={[{text:"Gothem",callback:()=>{}}]} 
            right={[{text:"Login",callback:()=>{router("/login")}},
            {text:"Meetings",callback:()=>{"/meetings"}}]} />
    </>
}