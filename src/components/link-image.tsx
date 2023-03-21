import { Link } from "react-router-dom";

type LinkImageProps = {
    link: string
    url: string
    alt: string
    width:number
    foot: any[]
}

export function LinkImage(props:LinkImageProps){

    const myStyle = {
        container:{
            margin:"8px",
            padding: "10px",
            fontFamily: "Sans-Serif"
        },
        image:{
            width: props.width+"px",
            margin: "5px"
        }
    };

    return<>
        <div>
        {props.link.length===0 ? 
        <div style={{...myStyle.container,borderRadius:"10px",position:"relative"}}>
            <img src={props.url} alt={props.alt} style={myStyle.image}/>
            <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"}}>{props.foot}</div>
        </div>:
        <Link to={props.link}>
            <div style={{...myStyle.container,borderRadius:"10px",position:"relative"}}>
                <img src={props.url} alt={props.alt} style={myStyle.image}/>
                <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"}}>{props.foot}</div>
            </div>
        </Link>}
        </div>
    </>

    
}

