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

export const NavBar = () => {
  return (
    <Navbar>
      <NavbarGroup align={"left"}>
        <NavbarHeading>Mercury UI</NavbarHeading>
        <NavbarDivider />
        <Button className={Classes.MINIMAL} icon="box" text="Install" />
        <Button className={Classes.MINIMAL} icon="list" text="Packages" />
      </NavbarGroup>
    </Navbar>
  )
}

export default NavBar
