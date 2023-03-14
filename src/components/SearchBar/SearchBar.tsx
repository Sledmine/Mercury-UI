import React from "react"

import { Button, InputGroup, Intent } from "@blueprintjs/core"

export const SearchBar = () => {
  return (
    <InputGroup
      leftIcon="search"
      placeholder="Search packages..."
      rightElement={<Button icon="filter" intent={Intent.PRIMARY} />}
    />
  )
}

export default SearchBar
