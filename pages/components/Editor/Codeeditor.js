import CodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';
import {StreamLanguage} from '@codemirror/language'
import {go} from '@codemirror/legacy-modes/mode/go'
import {python} from "@codemirror/lang-python"
import {rust} from "@codemirror/lang-rust"
import {cpp} from '@codemirror/lang-cpp'
import * as themes from '@uiw/codemirror-themes-all'
import InputBox from './Inputbox';
import OutPutBox from './Outputbox';
const p = 'print("Hello World")';
const languages={
  'python':python,
  'cpp':cpp,
  'golang':go,
  'rust':rust
}
const themeNames={
  'abyss':themes.abyss,
  'monokai':themes.monokai,
  'abcdef':themes.abcdef,
  'androidstudio':themes.androidstudio,
  'atomone':themes.atomone,
  'aura':themes.aura,
  'basic':themes.basic,
  'bbedit':themes.bbedit,
  'bespin':themes.bespin,
  'duotone':themes.duotone,
  'dracula':themes.dracula,
  'eclipse':themes.eclipse,
  'github':themes.github,
  'gruvbox-dark':themes.gruvboxDark,
  'kimbie':themes.kimbie,
  'material':themes.material,
  'noctisLlilac':themes.noctisLilac,
  'okaidia':themes.okaidia
}
export default function Editor() {
  const handleLanguage=(event)=>{
    setLanguageName(languages[event.target.value])
  }
  const handleTheme = (event) => {
    setThemeName(themeNames[event.target.value])
  }
  const [LanguageName,setLanguageName]=useState()
  const [ThemeName, setThemeName] = useState();
  return (
    <div className='bg-slate-900 px-1 py-1'>
      <div>
        <div className='flex'>
          <div className='mr-2'>
            <select onChange={handleLanguage}>
              <option value="python">Python</option>
              <option value="python3">Python3</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="golang">Go</option>
              <option value="rust">Rust</option>
            </select>
            </div>
          <div>
            <select onChange={handleTheme}>
              <option value="abcdef">abcdef</option>
              <option value="androidstudio">androidstudio</option>
              <option value="atomone">atomone</option>
              <option value="aura">aura</option>
              <option value="basic">basic</option>
              <option value="bbedit">bbedit</option>
              <option value="bespin">bespin</option>
              <option value="duotone">duotone</option>
              <option value="eclipse">eclipse</option>
              <option value="gruvbox-dark">gruvboxDark</option>
              <option value="github">github</option>
              <option value="kimbie">kimbie</option>
              <option value="dracula">Dracula</option>
              <option value="monokai">Monokai</option>
              <option value="noctisLilac">noctisLilac</option>
              <option value="abyss">Abyss</option>
              <option value="okaidia">Okaidia</option>
            </select>
          </div>
        </div>
        <div className='h-screen flex'>
          <div className='w-screen'>{/*extensions={[python({ python: true })]}*/}
            <CodeMirror value={p} extensions={[cpp({cpp:true})]} theme={ThemeName} height='calc(95vh)' width='calc(70vw)' />
          </div>
          <div className='flex flex-col'>
            <div>
              <InputBox></InputBox>
            </div>
            <div>
              <OutPutBox></OutPutBox>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
