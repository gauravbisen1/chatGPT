import React, { useContext } from 'react'
import "./Chat.css"
import { MyContext } from './MyContext';

const Chat = () => {
  const {newChat,prevChats} = useContext(MyContext);
  return (
    <>
    {newChat && <h1>Start a new chat!</h1>}
      <div className='chats'>
          {
            prevChats?.map((chat , idx) => 
                <div className={chat.role === "user"? "userDiv" : "gptDiv"} key={idx}>
                      {
                        chat.role === "user"?
                        <p className='userMsg'>{chat.content}</p>:
                        <p className='gptMsg'>{chat.content}</p>
                      }
                </div>
            )
          }


          {/* <div className="userDiv">
            <p className='userMsg'> User Message</p>
          </div>
          <div className="gptDiv">
            <p className='gptMsg'> Gpt Generated Message</p>
          </div> */}
      </div>
    </>
  )
}

export default Chat