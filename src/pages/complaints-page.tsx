import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { getAllComplaints, updateComplaint } from "../api/request";
import { LinkImage } from "../components/link-image";
import { NavBar } from "../components/nav-bar";
import { PageHeader } from "../components/page-header";
import scroll from "../assets/Scroll-PNG-Clipart.png";
import { AppUser, Complaint } from "../api/types";
import { getUser, removeUser } from "../utils/helpers";
import { RadioSelect } from "../components/radio-select";

export type SelectState={
    id:number 
    selected:string
    label:string
    selections:string[]
}

const choices:string[] = ["HIGH PRIORITY","LOW PRIORITY","IGNORED","ADDRESSED","UNREVIEWED"]

export function ComplaintsPage(){
    const router = useNavigate();
    const queryClient = useQueryClient();
    const user:AppUser = getUser();
    const log:boolean = user.user_id>0 ? true:false;
    const {isLoading, isError, data = []} = useQuery("complaintscache", getAllComplaints);
    const createMutation = useMutation(updateComplaint, {
        onSuccess: () => queryClient.invalidateQueries("complaintscache") 
    });
    if(isLoading){
        return <p>LOADING</p>
    }

    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }

    function updateState(s:string,i:number){
        const newState:Complaint[] = JSON.parse(JSON.stringify(data));
        const complaint = newState.find(c=>c.complaint_id===i);
        complaint!.status = s;
        createMutation.mutate(complaint!);
    }

    return<>
        <NavBar left={[{text:"Gothem",callback:()=>{router("/")}},...(user.role==="COUNCIL" ? [{text:"New Meeting",callback:()=>{router("/meetings/meeting")}}]:[])]}
        right={[{text:log ? "Logout":"Login",callback:log ? removeUser:()=>{router("/login")}},
        {text:"Report a Complaint",callback:()=>{router("/complaint")}},
        {text:"Meetings",callback:()=>{router("/meetings")}}]} />
        <PageHeader text={"Complaints"} size={72}/>
        <div style={{display:"flex", flexWrap:"wrap"}}>
            {data.map((m,i)=><LinkImage key={"link"+i} link={m.meeting_id! > 0 ? "/meetings/"+m.meeting_id:""} 
            url={scroll} 
            alt={"No Image"} 
            foot={[...((m.meeting_id! > 0)?[<p>Meeting assigned</p>]:[]),<p style={{fontSize:"20px"}}><strong>Complaint:</strong></p>,
                <p>{m.description}</p>,
                <p style={{fontSize:"20px"}}><strong>Status:</strong></p>,
                ...((user.role==="COUNCIL"&&m.meeting_id! < 0) ? [<RadioSelect key={m.complaint_id} selectState={{
                    id: m.complaint_id!,
                    selected: m.status??"",
                    label: "",
                    selections: choices
                }}  selectCallBack={updateState} />]:[<p>{m.status}</p>])]}
            width={400}
            />)}
        </div>
    </>
}
//&&m.status==="UNREVIEWED"