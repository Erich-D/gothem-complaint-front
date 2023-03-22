import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { getAllComplaints, insertMeeting, updateComplaint } from "../api/request";
import { AppUser, Complaint, EmptyComplaint, formMeetingDef, Meeting, MeetingForm, MeetingInitState } from "../api/types";
import { Checkbox } from "../components/checkbox";
import { Form } from "../components/form-comp";
import { NavBar } from "../components/nav-bar"
import { getUser, removeUser } from "../utils/helpers";

export type CompState={
    id:number 
    checked:boolean
    about:string
}

export type CompsCheckedState={
    compsChecked:CompState[]
}

const initState:CompsCheckedState = {
    compsChecked:[]
}

export function CreateMeetingPage(){
    const user:AppUser = getUser();
    const log:boolean = user.user_id>0 ? true:false;
    const router = useNavigate();
    const queryClient = useQueryClient();
    //set state for checkboxes
    const [comps, setComps] = useState(initState)
    //get complaints from database
    const {isLoading, isError, data = []} = useQuery("complaintscache", getAllComplaints);
    useEffect(() => {
        const newComps:CompsCheckedState = {compsChecked:[]};
        data.map(c=>{(c.meeting_id!<0)&&newComps.compsChecked.push({id:c.complaint_id??0,checked:false,about:` ${c.description}   Status: ${c.status}`})})
        setComps(newComps)
    },[data]);
    const complaintMutation = useMutation(updateComplaint, {
        onSuccess: () => console.log("updated success")
    });
    const meetingMutation = useMutation(insertMeeting, {
        onSuccess: (rdata) => {
            queryClient.invalidateQueries("meetingscache");
            comps.compsChecked.forEach(c=>{
                const comp:Complaint = data.find(cp=>cp.complaint_id===c.id&&c.checked)??JSON.parse(EmptyComplaint);
                comp.meeting_id = rdata.meeting_id;
                if(comp.complaint_id!>0)complaintMutation.mutate(comp);
            });
            router("/meetings")
        } 
    });
    if(isLoading){
        return <p>LOADING</p>
    }

    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }

    function createMeeting(form:MeetingForm){
        const date = new Date(form.time);
        const ms = Date.UTC(date.getFullYear(),date.getMonth(),date.getDay(),date.getHours(),date.getMinutes())/1000
        const meeting:Meeting = {address:form.address, summary:form.summary, time:ms, complaints:[]}
        meetingMutation.mutate(meeting);
    }
    function updateCheckStatus(index:number){
        console.log(index)
        const newComps:CompsCheckedState = JSON.parse(JSON.stringify(comps));
        newComps.compsChecked.forEach((c, currentIndex) =>
          {if(currentIndex === index) c.checked=!c.checked}
        )
        console.log(newComps)
        setComps(newComps)
    }
    return<>
        <NavBar left={[{text:"Gothem",callback:()=>{router("/")}}]}
        right={[{text:log ? "Logout":"Login",callback:log ? removeUser:()=>{router("/login")}},
        {text:"Check on Complaints",callback:()=>{router("/complaints")}},
        {text:"Meetings",callback:()=>{router("/meetings")}}]} />
        <div>
            <Form def={formMeetingDef} initState={MeetingInitState} handler={createMeeting} buttonText={"Submit"}/>
        </div>
        <div style={{display:"flex",flexDirection:'column',justifyContent:"center",alignItems:"center"}}>
        {comps.compsChecked.map((c,i)=><Checkbox key={`comp-${c.id}`} isChecked={c.checked} label={c.about} checkHandler={()=>{updateCheckStatus(i)}} index={i}/>)}
        </div>
    </>
}