import { useState } from "react"


type NavBarButton = {
    callback:any
    text:string
}

type NavBarProps = {
    left:NavBarButton[]
    right:NavBarButton[]
}

export function NavBar(props:NavBarProps){

    const myStyle = {
        bar:{
            width:"100%",
            display:"flex",
            backgroundImage:"radial-gradient(grey, slategrey, black)",
            justifyContent:"space-between",
            alignItems:"center",
            borderRadius:"10px",
            padding:"1px"
        }
    };

    return<>
        <div style={{...myStyle.bar}}>
            <div style={{marginLeft:"20px",  marginTop:"5px", marginBottom:"5px"}}>
                {props.left.map(b=><NavButton text={b.text} callback={b.callback}/>)}
            </div>
            <div style={{marginRight:"20px",  marginTop:"5px", marginBottom:"5px"}}>
                {props.right.map(b=><NavButton text={b.text} callback={b.callback}/>)}
            </div>
        </div>
    </>
}

export function NavButton(props:NavBarButton){
    
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
     };
     const handleMouseLeave = () => {
        setIsHover(false);
     };

    const myStyle = {
        button:{
            display:"table-cell",
            backgroundImage: isHover ? "radial-gradient(black, slategrey, grey, white)":"radial-gradient(white, grey, slategrey, black)",
            textDecoration:"none",
            borderRadius:"10px",
            padding:"5px"
        }
    };

    return <>
            <a href="#0" style={{...myStyle.button, textAlign:"center", cursor:"pointer"}} 
                onClick={()=>{props.callback()}}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <h1 style={{marginTop:"2px",marginBottom:"2px"}}>{props.text}</h1>
            </a>
        </>
}