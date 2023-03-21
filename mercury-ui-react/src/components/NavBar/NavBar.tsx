import React, { useEffect, useState } from "react"
import {
  Button,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Classes,
} from "@blueprintjs/core"
import "./NavBar.css"
import { useDispatch, useSelector } from "react-redux"
import { selectTheme, setPage, setTheme } from "../../redux/slices/appSlice"
import mercury from "../../mercury"

export const NavBar = () => {
  const currentTheme = useSelector(selectTheme)
  const dispatch = useDispatch()
  const toggledTheme = currentTheme === "light" ? "dark" : "light"
  const [version, setVersion] = useState("")
  useEffect(() => {
    mercury.version().then((v) => setVersion(v || "unknown"))
  }, [])

  return (
    <Navbar
      style={{
        // Make this bar sticky
        position: "sticky",
        top: 0,
      }}
    >
      <NavbarGroup align="left">
        <NavbarHeading>Mercury UI</NavbarHeading>
        <NavbarDivider />
        <Button
          className={Classes.MINIMAL}
          onClick={() => dispatch(setPage("available"))}
          icon="globe-network"
          text="Available"
        />
        <Button
          className={Classes.MINIMAL}
          onClick={() => dispatch(setPage("installed"))}
          icon="box"
          text="Installed"
        />
      </NavbarGroup>
      <NavbarGroup align="right">
        <Button
          className={Classes.MINIMAL}
          icon={currentTheme === "light" ? "moon" : "flash"}
          onClick={() => dispatch(setTheme(toggledTheme))}
          text={currentTheme === "light" ? "Dark Theme" : "Light Theme"}
        />
        <NavbarDivider />
        <small>v{version || process.env.REACT_APP_VERSION}</small>
      </NavbarGroup>
    </Navbar>
  )
}

export default NavBar
