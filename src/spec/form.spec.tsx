import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { Form } from "../components/form-comp";

const formMock = jest.fn();
const formDef:string = `{
    "signIn":{
    "userName":"Your user name",
    "password":"Your password"}
}`;
const formState:string = `{
    "userName":"",
    "password":""
}`;

test("Form creates elements",async()=>{
    formMock.mockReturnValue({userName:"Joe",password:"password"});
    render(<Form def={formDef} initState={formState} handler={formMock} buttonText={"Submit"} />);
    const nameField = await screen.findByLabelText(/User Name/);
    const passField = await screen.findByLabelText(/Password/);
    const submitButton = await screen.findByText(/Submit/);
    act(()=>{userEvent.type(nameField,"Joe");});
    act(()=>{userEvent.type(passField,"password");});
    expect(nameField.getAttribute("value")).toContain("Joe");
    expect(passField.getAttribute("value")).toContain("password");
    act(()=>{userEvent.click(submitButton);});
    expect(formMock.mock.results[0].value["userName"]).toBe("Joe");
    expect(formMock.mock.results[0].value["password"]).toBe("password");
})