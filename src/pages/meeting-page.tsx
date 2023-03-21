import { useNavigate, useParams } from "react-router";
import { LinkImage } from "../components/link-image";
import { NavBar } from "../components/nav-bar";
import { PageHeader } from "../components/page-header";
import scroll from "../assets/Scroll-PNG-Clipart.png"
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getMonthDay, getTime, getUser, removeUser } from "../utils/helpers";
import { getAllComplaints, getMeeting, updateComplaint, updateMeeting } from "../api/request";
import { StrongPar } from "../components/strong-par";
import { AppUser, Complaint, EmptyComplaint, formMeetingDef, formUpdateMeetingDef, Meeting, MeetingForm } from "../api/types";
import { Form } from "../components/form-comp";
import { RadioSelect } from "../components/radio-select";
import { useEffect, useState } from "react";
import { Checkbox } from "../components/checkbox";
import { CompsCheckedState, CompState } from "./create-meeting-page";

const choices:string[] = ["HIGH PRIORITY","LOW PRIORITY","IGNORED","ADDRESSED","UNREVIEWED"]

const initState:CompsCheckedState = {
    compsChecked:[]
}

export function MeetingPage(){
    const user:AppUser = getUser();
    const log:boolean = user.user_id>0 ? true:false;
    const {meetingid} = useParams();
    const Id = Number(meetingid);
    const queryClient = useQueryClient();
    const router = useNavigate();
    const [comps, setComps] = useState(initState)
    const {isLoading:meeting_loading, isError:meeting_error, data:mdata} = useQuery(["singlemeetingcache",Id], ()=>getMeeting(Id));
    const {data:cdata = []} = useQuery("complaintscache", getAllComplaints);
    const createMutation = useMutation(updateComplaint, {
        onSuccess: () => {
            queryClient.invalidateQueries("singlemeetingcache");
            queryClient.invalidateQueries("complaintscache")
        } 
    });
    const meetingMutation = useMutation(updateMeeting, {
        onSuccess: () => {
            queryClient.invalidateQueries("singlemeetingcache");
            queryClient.invalidateQueries("complaintscache");
            router("/meetings")
        }
    });
    useEffect(() => {
        const newComps:CompsCheckedState = {compsChecked:[]};
        cdata.map(c=>{(c.meeting_id!<0)&&newComps.compsChecked.push({id:c.complaint_id??0,checked:false,about:` ${c.description}   Status: ${c.status}`})})
        setComps(newComps)
    },[mdata]);
    if(meeting_loading){
        return <p>LOADING</p>
    }

    if(meeting_error){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }

    function updatedMeeting(form:MeetingForm){
        const date = new Date(form.time);
        const ms = Date.UTC(date.getFullYear(),date.getMonth(),date.getDay(),date.getHours(),date.getMinutes())/1000
        const meeting:Meeting = {meeting_id:form.meeting_id, address:form.address, summary:form.summary, time:ms, complaints:[]}
        meetingMutation.mutate(meeting)
    }

    function updateState(s:string,i:number){
        const complaint = mdata?.complaints.find(c=>c.complaint_id===i);
        complaint!.status = s;
        createMutation.mutate(complaint!);
    }

    function updateCheckStatus(index:number){
        const compCheck:CompState = comps.compsChecked.find(c=>c.id===index)!;
        if(compCheck)compCheck!.checked = !compCheck?.checked;
        let comp:Complaint = JSON.parse(EmptyComplaint);
        if(compCheck)comp = cdata.find(cp=>cp.complaint_id===compCheck!.id&&compCheck!.checked)!;
        comp.meeting_id = mdata!.meeting_id;
        if(comp.complaint_id!>0)createMutation.mutate(comp!);
    }

    // function removeComplaintFromMeeting(comp:Complaint){

    // }
    // //mdata is meeting to delete send complaints to removeComplaintfromMeeting() before deleting
    // function deleteMeeting(){

    // }

    function removeComplaint(index:number){
        const compCheck:CompState = comps.compsChecked.find(c=>c.id===index)!;
        if(compCheck)compCheck!.checked = !compCheck?.checked;
        const complaint:Complaint = cdata.find(cp=>cp.complaint_id===index)!;//cdata is complaint cache
        complaint.meeting_id = -1;
        createMutation.mutate(complaint);
    }

    function getMeetingFormState(m:Meeting){
        const t:string = new Date(m.time).toISOString();
        const result:MeetingForm = {meeting_id:m.meeting_id,address:m.address,summary:m.summary,time:t.substring(0,t.lastIndexOf(":"))}
        return result
    }

    return<>
    <NavBar left={[{text:"Gothem",callback:()=>{router("/")}},...(user.role==="COUNCIL" ? [{text:"New Meeting",callback:()=>{router("/meetings/meeting")}}]:[])]}
        right={[{text:log ? "Logout":"Login",callback:log ? removeUser:()=>{router("/login")}},
        {text:"Check on Complaints",callback:()=>{router("/complaints")}},
        {text:"Meetings",callback:()=>{router("/meetings")}}]} />
    <PageHeader text={"Meeting"} size={72}/>
    <div style={{display:"flex",justifyContent:'center'}}>
        <LinkImage link={""} 
        url={scroll} 
        alt={"oops no pic"} 
        width={700} 
        foot={(user.role==="COUNCIL")?[<Form def={formUpdateMeetingDef} initState={JSON.stringify(getMeetingFormState(mdata!))} handler={updatedMeeting} buttonText={"Submit"}/>]:[
            <StrongPar size={20} text={"Meeting:"}/>,
            <p>{mdata?.summary}</p>,
            <StrongPar size={20} text={"Set for:"}/>,
            <p>{getMonthDay(mdata ? mdata.time:0)} at {getTime(mdata ? mdata.time:0)}</p>,
            <StrongPar size={20} text={"To be held at:"}/>,
            <p>{mdata?.address}</p>
            ]}/>
        <div style={{display:"flex", flexDirection:'column'}}>
            <PageHeader text={"Complaints"} size={38}/>
            {mdata?.complaints.map(c=><LinkImage key={c.complaint_id} link={""} 
                    url={scroll} alt={"oops no pic"} width={400} 
                    foot={[...((user.role==="COUNCIL")?[<Checkbox isChecked={false} label={"Remove"} checkHandler={()=>removeComplaint(c.complaint_id!)} index={c.complaint_id!}/>]:[]),
                    <StrongPar size={14} text={"Complaint of:"}/>,
                    <p>{c.description}</p>,
                    <StrongPar size={14} text={"Which is of:"}/>,
                    ...((user.role==="COUNCIL") ? [<RadioSelect key={c.complaint_id} selectState={{
                        id: c.complaint_id!,
                        selected: c.status??"",
                        label: "",
                        selections: choices
                    }}  selectCallBack={updateState} />]:[<p>{c.status}</p>])]}/>)}
        </div>
        
        <div>
            {(user.role==="COUNCIL")&& <PageHeader text={"Complaints"} size={38}/>}
            {(user.role==="COUNCIL")&&comps.compsChecked.map((c,i)=><Checkbox 
                key={`comp-${i}`} 
                isChecked={c.checked} 
                label={c.about} 
                checkHandler={()=>{updateCheckStatus(c.id)}} 
                index={c.id}/>)
            }
        </div>   
               
    </div>
    </>
}