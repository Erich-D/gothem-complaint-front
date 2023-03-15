import { Link } from "react-router-dom";

type LinkImageProps = {
    link: string
    url: string
    alt: string
    foot: string
}

const myStyle = {
    container:{
        margin:"8px",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Sans-Serif"
    },
    image:{
        width: "400px",
        margin: "5px"
    }
};

export function LinkImage(props:LinkImageProps){


    return<>
        <Link to={props.link}>
            <div style={{...myStyle.container,borderRadius:"10px"}}>
                <img src={props.url} alt={props.alt} style={myStyle.image}/>
                <h3>{props.foot}</h3>
            </div>
        </Link>
    </>

    
}

