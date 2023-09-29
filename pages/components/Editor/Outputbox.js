export default function OutPutBox(props){
    return(
        <div>
        <textarea  value={props.code} name="output" style={{height:"86vh",width:"66vw",border:"2px solid black"}} className="shadow-md px-2 dark:bg-black" placeholder='no output'></textarea>
        </div>
    )
}