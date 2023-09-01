import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import { useState, useEffect } from 'react';
import { langs } from '@uiw/codemirror-extensions-langs';
import * as themes from '@uiw/codemirror-themes-all'
import OutPutBox from './Outputbox';
import React from 'react';
import { css } from '@emotion/react'
import { ClipLoader } from 'react-spinners';
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
  'okaidia': themes.okaidia,
  'vscode': themes.vscodeDark
}
const spinnerStyles = css`
  display: block;
  margin: 0 auto;
`;
export default function Editor() {
  const handleLanguage = (event) => {
    setLanguageName(languages[event.target.value])
    setSelected_language(event.target.value);
  }
  const handleTheme = (event) => {
    setThemeName(themeNames[event.target.value])
  }
  async function handleClick(event) {
    const post_data = {
      "data_input": code_input,
      "lang": selected_language,
      "typed_code": code
    };
    // console.log(code_input)
    if (code != null) {
      setLoading(true);
      let link_local = "https://codeverse-language-server.azurewebsites.net/"
      let response = await axios.post(link_local, { "data": post_data });
      let response2 = response.data;
      if (response2.run_success == false) {
        if (response2.full_compile_error) {
          setOut(response2.full_compile_error);
        }
        else {
          setOut(response2.full_runtime_error);
        }

      }
      else {
        setOut(response2.code_output);
      }
      setLoading(false);
      console.log(response2);
    }
  }
  const onChange = React.useCallback((value, viewUpdate) => {
    setCode(value);
  }, []);
  const handleInput = (event) => {
    setCode_input(event.target.value);
  }
  const [code, setCode] = useState();
  const [LanguageName, setLanguageName] = useState(langs.cpp());
  const [ThemeName, setThemeName] = useState(themes.vscodeDark);
  const [out, setOut] = useState();
  const [selected_language, setSelected_language] = useState("cpp");
  const [code_input, setCode_input] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div className='bg-slate-900 px-1 py-1'>
      <div>
        <div className='flex mx-2'>
          <div className='mr-2'>
            <select onChange={handleLanguage} className='h-7'>
              <option value="cpp">C++</option>
              <option value="c">C</option>
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
            <select onChange={handleTheme} className='h-7'>
              <option value="vscode">vscodeDark</option>
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
          <div className='mx-2 px-1 bg-white hover:bg-slate-400'>
            {loading ? (<div className='spinner-container'>
              <ClipLoader color='#123abc' loading={loading} css={spinnerStyles} size={22}></ClipLoader>
            </div>
            ) : (<button className='text-lg' onClick={handleClick}>Run</button>)}
          </div>
        </div>
        <div className='h-screen flex mx-2'>
          <div className='w-screen'>
            <CodeMirror extensions={[LanguageName]} theme={ThemeName} height='calc(95vh)' width='calc(70vw)' onChange={onChange} />
          </div>
          <div className='flex flex-col'>
            <div>
              <textarea value={code_input} name="input" style={{ height: "49vh", width: "29vw" }} className="bg-slate-800 text-white px-2" onChange={handleInput} placeholder='type input here....'></textarea>
            </div>
            <div>
              <OutPutBox code={out} ></OutPutBox>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
