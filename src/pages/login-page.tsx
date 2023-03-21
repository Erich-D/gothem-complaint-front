import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { loginUser } from "../api/request";
import { formDefLogin, formStateLogin, Login } from "../api/types";
import { Form } from "../components/form-comp";
import { NavBar } from "../components/nav-bar"
import { PageHeader } from "../components/page-header";
import { setUser } from "../utils/helpers";


export function LoginPage(){
    const router = useNavigate();
    const queryClient = useQueryClient();
    const loginMutation = useMutation(loginUser, {
        onSuccess: (data) => {
            setUser(data)
            router("/meetings")
        }
    });

    function submitForm(form:Login){
        loginMutation.mutate(form);
    }

    return<>
    <NavBar left={[{text:"Gothem",callback:()=>{router("/")}}]} 
            right={[{text:"Meetings",callback:()=>{router("/meetings")}},
            {text:"Check on Complaints",callback:()=>{router("/complaints")}},
            ]} />
    <PageHeader text={"Login"} size={72}/>
    <Form def={formDefLogin} initState={formStateLogin} handler={submitForm} buttonText={"Login"}/>
    </>
}