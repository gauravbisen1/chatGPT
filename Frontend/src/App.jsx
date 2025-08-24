import './App.css'
import Sidebar from "./SideBar.jsx"
import ChatWindow from "./ChatWindow.jsx"
import {MyContext} from "./MyContext.jsx"
import { useState } from 'react'
import {v1 as uuidv1} from "uuid"

function App() {
  const [prompt , setPrompt] = useState("");//prompt is msg from user
  const [reply , setReply] = useState(null);//reply from ai
  const [currThreadId, setCurrThreadId] = useState(uuidv1());

  const providerValues = {
    prompt , setPrompt,
    reply , setReply,
    currThreadId, setCurrThreadId
  };//passing values

  return (
    <div className='app'>
      <MyContext.Provider value = {providerValues}>
          <Sidebar></Sidebar>
          <ChatWindow></ChatWindow>
      </MyContext.Provider>
      
    </div>
  )
}

export default App
