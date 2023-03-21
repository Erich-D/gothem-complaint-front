
type PageHeadProps={
    text:string
    size:number
}
export function PageHeader(props:PageHeadProps){

    return <>
        <div style={{textAlign:"center"}}>
            <h1 style={{textShadow:"2px 2px 5px white",fontSize:props.size+"px"}}>{props.text}</h1>
        </div>
    </>
}