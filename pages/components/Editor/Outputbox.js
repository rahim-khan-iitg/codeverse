export default function OutPutBox(props){
    return(
        <div>
        <textarea  value={props.code} name="output" style={{height:"44vh",width:"29vw"}} className="bg-slate-800 text-white"></textarea>
        </div>
    )
}