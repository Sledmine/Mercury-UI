import React, { useEffect, useState } from "react"
import {
  Button,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Classes,
  Tab,
  Tabs,
} from "@blueprintjs/core"
import "./NavBar.css"
import { useDispatch, useSelector } from "react-redux"
import {
  selectPage,
  selectTheme,
  setPage,
  setTheme,
} from "../../redux/slices/appSlice"

export const NavBar = () => {
  const currentTheme = useSelector(selectTheme)
  const dispatch = useDispatch()
  const toggledTheme = currentTheme === "light" ? "dark" : "light"
  const currentPage = useSelector(selectPage)

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
          //className={Classes.MINIMAL}
          large
          intent={currentPage === "available" ? "primary" : "none"}
          onClick={() => dispatch(setPage("available"))}
          icon="globe-network"
          text="Available"
        />
        <Button
          //className={Classes.MINIMAL}
          large
          intent={currentPage === "installed" ? "primary" : "none"}
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
      </NavbarGroup>
    </Navbar>
  )
}

export default NavBar
