import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';
import { langs } from '@uiw/codemirror-extensions-langs';
import * as themes from '@uiw/codemirror-themes-all'
import InputBox from './Inputbox';
import OutPutBox from './Outputbox';
import React from 'react';
const p = 'print("Hello World")';
const languages = {
  'c': langs.c(),
  'cpp': langs.cpp(),
  'python': langs.python(),
  'python3': langs.python(),
  'java': langs.java(),
  'csharp': langs.csharp(),
  'javascript': langs.javascript(),
  'ruby': langs.ruby(),
  'swift': langs.swift(),
  'golang': langs.go(),
  'scala': langs.scala(),
  'kotlin': langs.kotlin(),
  'rust': langs.rust(),
  'php': langs.php(),
  'typescript': langs.typescript(),
  'erlang': langs.erlang(),
  'dart': langs.dart()
}
const themeNames = {
  'abyss': themes.abyss,
  'monokai': themes.monokai,
  'abcdef': themes.abcdef,
  'androidstudio': themes.androidstudio,
  'atomone': themes.atomone,
  'aura': themes.aura,
  'basic': themes.basic,
  'bbedit': themes.bbedit,
  'bespin': themes.bespin,
  'duotone': themes.duotone,
  'dracula': themes.dracula,
  'eclipse': themes.eclipse,
  'github': themes.github,
  'gruvbox-dark': themes.gruvboxDark,
  'kimbie': themes.kimbie,
  'material': themes.material,
  'noctisLlilac': themes.noctisLilac,
  'okaidia': themes.okaidia
}
export default function Editor() {
  const handleLanguage = (event) => {
    setLanguageName(languages[event.target.value])
  }
  const handleTheme = (event) => {
    setThemeName(themeNames[event.target.value])
  }
  // async function handleClick(){
  //     const post_data={
  //       "data_input":"",
  //       "lang":LanguageName['language']['name'],
  //       "typed_code":code
  //     };
  //     let url_link="https://leetcode.com/playground/api/runcode";
  //     console.log(code,LanguageName['language']['name'])
  //     axios.post(url_link,{post_data},{headers:{"Access-Control-Allow-Origin":"*"}})
  // }
  const onChange = React.useCallback((value, viewUpdate) => {
    setCode(value)
  }, []);
  const [code, setCode] = useState();
  const [LanguageName, setLanguageName] = useState(langs.c());
  const [ThemeName, setThemeName] = useState();
  return (
    <div className='bg-slate-900 px-1 py-1'>
      <div>
        <div className='flex'>
          <div className='mr-2'>
            <select onChange={handleLanguage}>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="python3">Python3</option>
              <option value="java">Java</option>
              <option value="csharp">CSharp</option>
              <option value="javascript">Javascript</option>
              <option value="ruby">Ruby</option>
              <option value="swift">Swift</option>
              <option value="golang">Go</option>
              <option value="scala">Scala</option>
              <option value="kotlin">Kotlin</option>
              <option value="rust">Rust</option>
              <option value="php">PHP</option>
              <option value="typescript">TypeScript</option>
              <option value="erlang">Erlang</option>
              <option value="dart">Dart</option>
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
          <div className=' mx-2 px-2 bg-white hover:bg-slate-400'>
            <button className='text-lg' onClick={handleClick}>Run</button>
          </div>
        </div>
        <div className='h-screen flex'>
          <div className='w-screen'>
            <CodeMirror extensions={[LanguageName]} theme={ThemeName} height='calc(95vh)' width='calc(70vw)' />
          </div>
          <div className='flex flex-col'>
            <div>
              <InputBox></InputBox>
            </div>
            <div>
              <OutPutBox code={code}></OutPutBox>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
