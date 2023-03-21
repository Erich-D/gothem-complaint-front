import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { NavBar } from "../components/nav-bar"

const navBarMock = jest.fn();

test("Navbar creates elements",async ()=>{
    navBarMock.mockReturnValueOnce("left").mockReturnValueOnce("right")
    render(<NavBar left={[{text:"Cars",callback:navBarMock}]} right={[{text:"New Car",callback:navBarMock}]}/>);
    const [lButton,rButton] = await screen.findAllByRole('link');
    expect(lButton.innerHTML).toContain("Cars");
    expect(rButton.innerHTML).toContain("New Car");
    userEvent.click(lButton);
    expect(navBarMock.mock.results[0].value).toContain("left");
    userEvent.click(rButton);
    expect(navBarMock.mock.results[1].value).toContain("right");
})