import React from 'react'
import "./SideBar.css"

const SideBar = () => {
  return (
    <section className='sidebar'>
      {/* new chat button  */}
      <button>
        <img src="src/assets/blacklogo.png" className='logo' alt="chatgpt logo" />
        <span><i className="fa-solid fa-pen-to-square"></i></span>
      </button>

      {/* history */}
        <ul className='history'>
            <li>Thread1</li>
            <li>Thread2</li>
            <li>Thread3</li>
        </ul>

      {/* sign  */}
      <div className="sign">
        <p>By GauravBisen &hearts;</p>
      </div>
    </section>
  )
}

export default SideBar