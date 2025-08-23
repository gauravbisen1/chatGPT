import React from 'react'
import "./SideBar.css"

const SideBar = () => {
  return (
    <section className='sidebar'>
      {/* new chat button  */}
      <button>
        <img src="src/assets/blacklogo.png" alt="chatgpt logo" />
        <i className="fa-solid fa-pen-to-square"></i>
      </button>

      {/* history */}
        <ul className='history'>
            <li>History1</li>
            <li>History2</li>
            <li>History3</li>
        </ul>
        
      {/* sign  */}
      <div className="sign">
        <p>By GauravBisen &hearts;</p>
      </div>
    </section>
  )
}

export default SideBar