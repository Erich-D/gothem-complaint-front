import { useNavigate } from "react-router";
import { AppUser } from "../api/types";
import { NavBar } from "../components/nav-bar"
import { PageHeader } from "../components/page-header";
import { getUser, removeUser } from "../utils/helpers";


export function HomePage(){
    const router = useNavigate();
    const user:AppUser = getUser();
    const log:boolean = user.user_id>0 ? true:false;
    return<>
        <NavBar left={[{text:"Gothem",callback:()=>{}},...(user.role==="COUNCIL" ? [{text:"New Meeting",callback:()=>{router("/meetings/meeting")}}]:[])]} 
            right={[{text:log ? "Logout":"Login",callback:log ? removeUser:()=>{router("/login")}},
            {text:"Check on Complaints",callback:()=>{router("/complaints")}},
            {text:"Meetings",callback:()=>{router("/meetings")}}
            ]} />
        <PageHeader text={"Welcome to Gothem City"} size={72}/>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh",textShadow:"2px 2px 5px white"}}>
        <h1>
            <a href="#0" onClick={()=>{router("/login")}}>{log ? "Logout":"Login"}</a> or 
            <a href="#0" onClick={()=>{router("/meetings")}}> Continue</a> as 
             {log ? " a guest":user.role==="COUNCIL" ? " a council member":" a constituent"}
        </h1>
        </div>
        
    </>
}