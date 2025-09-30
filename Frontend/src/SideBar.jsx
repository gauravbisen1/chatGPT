import React, {useContext} from 'react'
import "./SideBar.css"
import {MyContext} from "./MyContext"
import { useEffect } from 'react';
import {v1 as uuidv1} from "uuid"


const SideBar = () => {
  const {allThreads , setAllThreads , currThreadId , setNewChat , setPrompt , setReply , setCurrThreadId , setPrevChats} = useContext(MyContext);

  const getAllThreads = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/thread");
        const res = await response.json();
        const filterData = res.map(thread => ({threadId: thread.threadId, title: thread.title}));
        // console.log(filterData);
        setAllThreads(filterData);
      } catch (error) {
        console.log(error);
      }
  };

  useEffect(()=>{
    getAllThreads();
  }, [currThreadId])

  const createNewchat = () =>  {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  }

  return (
    <>
    <section className='sidebar'>
      {/* new chat button  */}
      <button onClick={createNewchat}>
        <img src="src/assets/blacklogo.png" className='logo' alt="chatgpt logo" />
        <span><i className="fa-solid fa-pen-to-square"></i></span>
      </button>

      {/* history */}
        <ul className='history'>
           {
            allThreads?.map((thread,idx)=> (
              <li key={idx}>{thread.title}</li>
            ))
           }
        </ul>

      {/* sign  */}
      <div className="sign">
        <p>By GauravBisen &hearts;</p>
      </div>
    </section>
    </>
  )
}

export default SideBar