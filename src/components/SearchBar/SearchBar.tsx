import React from "react"

import { InputGroup } from "@blueprintjs/core"
import { useSelector } from "react-redux"
import { selectTheme } from "../../redux/slices/appSlice"
import { current } from "@reduxjs/toolkit"

export const SearchBar = () => {
  const currentTheme = useSelector(selectTheme)

  return (
    <InputGroup
      leftIcon="search"
      placeholder="Search packages..."
      large
      style={{ backgroundColor: currentTheme === "dark" ? "#1f2329" : undefined }}
    />
  )
}

export default SearchBar
