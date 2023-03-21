export const jsonComplaintForm:string=`
{
    "complaintForm":{
        "description":"Describe complaint here"
    }
}
`;
export const jsonComplaintFormInitState:string=`{
    "complaint_id":-1,
    "description":"",
    "status":"UNREVIEWED",
    "meeting_id":-1
}`;

export const formDefLogin:string = `{
    "signIn":{
    "username":"Your user name",
    "password":"Your password"}
}`;

export const formStateLogin:string = `{
    "username":"",
    "password":""
}`;

export const formMeetingDef:string=`{
    "newMeeting":{
        "address":"Meeting Address",
        "time":"date",
        "summary":"Purpose of meeting"
    }
}`

export const formUpdateMeetingDef:string=`{
    "updateMeeting":{
        "address":"Meeting Address",
        "time":"date",
        "summary":"Purpose of meeting"
    }
}`

export const MeetingInitState:string=`{
    "address":"",
    "time":0,
    "summary":"",
    "compliants":[]
}`

export const EmptyComplaint:string=`{
    "complaint_id":-1,
    "description":"",
    "status":"",
    "meeting":""
}`

export type MeetingForm={
    meeting_id?:number
    address:string
    time:string
    summary:string
}

export type Meeting={
    meeting_id?:number
    address:string
    time:number
    summary:string
    complaints:Complaint[]
}

export type Complaint={
    complaint_id?:number
    description:string
    status?:string
    meeting_id?:number
}

export type Login={
    username:string
    password:string
}

export type AppUser={
    user_id:number
    username:string
    password:string
    role:string
}