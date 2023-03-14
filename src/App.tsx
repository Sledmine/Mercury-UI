import React from "react"
import { useEffect } from "react"
import "normalize.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import "@blueprintjs/table/lib/css/table.css"
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css"
import "./App.css"
import { NavBar } from "./components/NavBar/NavBar"
import { SearchBar } from "./components/SearchBar/SearchBar"
import PackagesList from "./components/PackagesList/PackagesList"
import { os } from "@neutralinojs/lib"
import MercuryPackage from "./types/MercuryPackage"

function App() {
  const [packages, setPackages] = React.useState([] as MercuryPackage[])

  useEffect(() => {
    const getPackages = async () => {
      try {
        const { stdOut } = await os.execCommand("mercury fetch --json")
        const data = JSON.parse(stdOut)
        setPackages(Object.keys(data).map((key) => data[key]))
      } catch (error) {
        console.log(error)
      }
    }
    getPackages()
  }, [])

  return (
    <div className="App">
      <NavBar />
      <SearchBar />
      <PackagesList packages={packages}/>
    </div>
  )
}

export default App
