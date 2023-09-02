export default function OutPutBox(props){
    return(
        <div>
        <textarea  value={props.code} name="output" style={{height:"44vh",width:"29vw",border:"2px solid black"}} className="shadow-md px-2" placeholder='no output'></textarea>
        </div>
    )
}