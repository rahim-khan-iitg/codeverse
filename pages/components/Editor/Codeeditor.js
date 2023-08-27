import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python'
import {abyss,monokai,dracula} from '@uiw/codemirror-themes-all';
import InputBox from './Inputbox';
import OutPutBox from './Outputbox';
import Languages from './languages';
import Themes from './themes';
const p = 'print("Hello World")';

export default function Editor() {
    // const themename=document.getElementById('themes').value
  return (
    <div>
      <div className='flex'>
      <Languages></Languages>
      <Themes></Themes>
      </div>
    <div className='grid grid-rows-3 grid-flow-col m-4 py-1 px-1 gap-1'>
      
      <div className='row-span-3 col-span-6'>
        <CodeMirror value={p} extensions={[python({ python: true})]} theme={dracula} height='755px' style={{borderRadius:"10px"}}/>
      </div>
      <div className='col-span-2'>
        <InputBox></InputBox>
      </div>
      <div className='row-span-2 col-span-2'>
        <OutPutBox></OutPutBox>
      </div>
    </div>
    </div>
  )
}
