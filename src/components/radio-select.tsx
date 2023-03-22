
import { SelectState } from "../pages/complaints-page";


type RadioProps={
    selectState:SelectState
    selectCallBack:any
}

export function RadioSelect(props:RadioProps){
    

    return<div>
        {props.selectState.selections.map(s=>
        <div key={"con"+s}><input key={"in"+s} type="radio" value={s} id={"radio-"+props.selectState.id} onChange={(e)=>props.selectCallBack(e.target.value,props.selectState.id)} checked={props.selectState.selected===s}/>
            <label key={"lab"+s} htmlFor={"radio-"+props.selectState.id}>{s}</label>
        </div>)}
    </div>
}