import { AppUser } from "../api/types";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


export function getMonthDay(t:number):string{
    const date:Date = new Date(t*1000);
    const dow:string = days[date.getDay()];
    const month:string = months[date.getMonth()];
    return `${dow} ${month} ${getDayOfMonth(date.getDate())} ${date.getFullYear()}`
}

export function getDayOfMonth(d:number):string{
    const suffix:string = (d%100===11||d%100==12||d%100==13) ? "th":(d%10===1) ? "st":(d%10===2) ? "nd":(d%10===3) ? "rd":"th";
    return d+suffix
}

export function getTime(t:number):string{
    const date:Date = new Date(t*1000);
    return `${date.getHours()}:${date.getMinutes()}`
}

export function setUser(data:AppUser){
    localStorage.setItem("username",data.username)
    localStorage.setItem("userid",data.user_id.toString())
    localStorage.setItem("userRole",data.role)
}

export function removeUser(){
    localStorage.removeItem("username")
    localStorage.removeItem("userid")
    localStorage.removeItem("userRole")
}

export function isUser():boolean{
    return localStorage.getItem("userid")===null ? false:true
}

export function getUser():AppUser{
    const user = {username:"",user_id:0,role:"",password:""}
    user.role = localStorage.getItem("userRole")??"";
    user.username = localStorage.getItem("username")??"";
    user.user_id = parseInt(localStorage.getItem("userid")??"0");
    return user;
}