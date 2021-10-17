import React, { useState } from "react"
import { IconContext } from "react-icons"
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import { Link } from "react-router-dom"

import { SidebarDataAgen } from "../sidebarAgen/sidebarDataAgen"
//import "./navbar.sass"
import Logo from "../../assets/image/BRI-AJ-v2.png"

function NavbarAgenComp() {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <IconContext.Provider value={{ color: "#1E212D" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <img src={Logo} alt="Logo" />
              <Link to="#" className="menu-bars"></Link>
            </li>
            {SidebarDataAgen.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span style={{ marginLeft: "16px" }}>{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default NavbarAgenComp
