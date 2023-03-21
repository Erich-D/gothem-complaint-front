import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { insertComplaint } from "../api/request";
import { AppUser, Complaint, jsonComplaintForm, jsonComplaintFormInitState } from "../api/types";
import { Form } from "../components/form-comp";
import { NavBar } from "../components/nav-bar";
import { PageHeader } from "../components/page-header";
import { getUser, removeUser } from "../utils/helpers";


export function ComplaintPage(){
    const user:AppUser = getUser();
    const log:boolean = user.user_id>0 ? true:false;
    const queryClient = useQueryClient();
    const router = useNavigate();

    const createMutation = useMutation(insertComplaint, {
        onSuccess: () => queryClient.invalidateQueries("complaintcache") 
    });

    function submitData(form:Complaint){
        createMutation.mutate(form);
        router("/meetings")
    }

    return<>
        <NavBar left={[{text:"Gothem",callback:()=>{router("/")}},...(user.role==="COUNCIL" ? [{text:"New Meeting",callback:()=>{router("/meetings/meeting")}}]:[])]}
        right={[{text:log ? "Logout":"Login",callback:log ? removeUser:()=>{router("/login")}},
        {text:"Check on Complaints",callback:()=>{router("/complaints")}},
        {text:"Meetings",callback:()=>{router("/meetings")}}]} />
        <PageHeader text={"Report a Complaint"} size={72}/>
        <Form def={jsonComplaintForm} initState={jsonComplaintFormInitState} handler={submitData} buttonText="Report Complaint"/>
    </>
}