
type StrongParParams={
    size:number 
    text:string
}

export function StrongPar(params:StrongParParams){


    return<>
        <p key={1} style={{fontSize:params.size+"px"}}><strong>{params.text}</strong></p>
    </>
}