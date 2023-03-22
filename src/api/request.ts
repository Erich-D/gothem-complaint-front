import { AppUser, Complaint, Login, Meeting } from "./types";

const url:string = "http://127.0.0.1:8080"       //"http://54.183.212.88:8080"

export async function getAllMeetings():Promise<Meeting[]> {
    const httpResponse = await fetch(url+"/meetings");
    const meetings: Meeting[] = await httpResponse.json();
    return meetings;
}

export async function insertMeeting(params:Meeting):Promise<Meeting>{
    const httpResponse = await fetch(url+"/meetings",{
        method:"POST",
        body:JSON.stringify(params),
        headers:{"Content-Type":"application/json"}
    });
    const meeting: Meeting = await httpResponse.json();
    return meeting;
}

export async function updateMeeting(params:Meeting):Promise<Meeting>{
    const httpResponse = await fetch(url+"/meetings",{
        method:"PUT",
        body:JSON.stringify(params),
        headers:{"Content-Type":"application/json"}
    });
    const meeting: Meeting = await httpResponse.json();
    return meeting;
}

export async function insertComplaint(params:Complaint):Promise<Complaint> {
    const httpResponse = await fetch(url+"/complaints",{
        method:"POST",
        body:JSON.stringify(params),
        headers:{"Content-Type":"application/json"}
    });
    const complaint: Complaint = await httpResponse.json();
    return complaint;
}

export async function deleteMeeting(params:number):Promise<boolean>{
    const httpResponse = await fetch(url+"/meetings/"+params,{
        method:"DELETE"
    });
    const success = await httpResponse.json();
    return success;
}

export async function getMeeting(params:number):Promise<Meeting> {
    const httpResponse = await fetch(url+"/meetings/"+params);
    const httpResponse2 = await fetch(url+"/complaints?id="+params);
    const meeting: Meeting = await httpResponse.json();
    const complaints:Complaint[] = await httpResponse2.json();
    meeting.complaints = complaints;
    return meeting;
}

export async function loginUser(params:Login):Promise<AppUser> {
    const httpResponse = await fetch(url+"/login",{
        method:"PATCH",
        body:JSON.stringify(params),
        headers:{"Content-Type":"application/json"}
    });
    const user: AppUser = await httpResponse.json();
    return user;
}

export async function getAllComplaints():Promise<Complaint[]> {
    const httpResponse = await fetch(url+"/complaints");
    const complaints: Complaint[] = await httpResponse.json();
    complaints.sort((c,c1)=>((c.status??"")>(c1.status??"")) ? 1:-1)
    return complaints;
}

export async function updateComplaint(params:Complaint):Promise<Complaint> {
    const httpResponse = await fetch(url+"/complaints",{
        method:"PUT",
        body:JSON.stringify(params),
        headers:{"Content-Type":"application/json"}
    });
    const complaint: Complaint = await httpResponse.json();
    return complaint;
}