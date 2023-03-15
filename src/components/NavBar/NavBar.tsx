import React from "react"
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
import { selectTheme, setTheme } from "../../redux/slices/appSlice"

export const NavBar = () => {
  const currentTheme = useSelector(selectTheme)
  const dispatch = useDispatch()
  const toggledTheme = currentTheme === "light" ? "dark" : "light"

  return (
    <Navbar>
      <NavbarGroup align="left">
        <NavbarHeading>Mercury UI</NavbarHeading>
        <NavbarDivider />
        <Button className={Classes.MINIMAL} icon="box" text="Install" />
        <Button className={Classes.MINIMAL} icon="list" text="Packages" />
      </NavbarGroup>
      <NavbarGroup align="right">
        <Button
          className={Classes.MINIMAL}
          icon={currentTheme === "light" ? "moon" : "flash"}
          onClick={() => dispatch(setTheme(toggledTheme))}
          text={currentTheme === "light" ? "Dark Theme" : "Light Theme"}
        />
      </NavbarGroup>
    </Navbar>
  )
}

export default NavBar
