import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { getAllMeetings } from "../api/request";
import { LinkImage } from "../components/link-image";
import { NavBar } from "../components/nav-bar";
import { getMonthDay, getUser, removeUser } from "../utils/helpers";
import scroll from "../assets/Scroll-PNG-Clipart.png";
import { PageHeader } from "../components/page-header";
import { AppUser } from "../api/types";


export function MeetingsPage(){
    const user:AppUser = getUser();
    const log:boolean = user.user_id>0 ? true:false;
    const router = useNavigate();
    const {isLoading, isError, data = []} = useQuery("meetingscache", getAllMeetings);

    if(isLoading){
        return <p>LOADING</p>
    }

    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }
    
    return<>
        <NavBar left={[{text:"Gothem",callback:()=>{router("/")}},...(user.role==="COUNCIL" ? [{text:"New Meeting",callback:()=>{router("/meetings/meeting")}}]:[])]}
        right={[{text:log ? "Logout":"Login",callback:log ? removeUser:()=>{router("/login")}},
        {text:"Check on Complaints",callback:()=>{router("/complaints")}}]} />
        <PageHeader text={"Gothem City Meetings"} size={72}/>
        <div style={{display:"flex", flexWrap:"wrap"}}>
            {data.map((m,i)=><LinkImage key={i} link={"/meetings/"+m.meeting_id} 
            url={scroll} 
            alt={"No Image"} 
            foot={[<p key={1} style={{fontSize:"20px"}}><strong>Meeting:</strong></p>,
                <p key={2}>{m.summary}</p>,
                <p key={3} style={{fontSize:"20px"}}><strong>Set for:</strong></p>,
                <p key={4}>{getMonthDay(m.time)}</p>]}
            width={400}
            />)}
        </div>
    </>
}