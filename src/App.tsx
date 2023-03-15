import React from "react"
import { useEffect } from "react"
import "./App.css"
import "normalize.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import "@blueprintjs/table/lib/css/table.css"
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css"
import { NavBar } from "./components/NavBar/NavBar"
import PackagesList from "./components/PackagesList/PackagesList"
import MercuryPackage from "./types/MercuryPackage"
import mercury from "./mercury"
import { useSelector } from "react-redux"
import { selectTheme } from "./redux/slices/appSlice"

function App() {
  const isDarkThemeEnabled = useSelector(selectTheme) === "dark"
  const [packages, setPackages] = React.useState([] as MercuryPackage[])

  useEffect(() => {
    const getPackages = async () => {
      try {
        const packages = await mercury.fetch()
        setPackages(packages)
      } catch (error) {
        console.error(error)
      }
    }
    getPackages()
  }, [])

  return (
    <div className={`App ${isDarkThemeEnabled ? "bp4-dark" : ""}`}>
      <NavBar />
      <PackagesList packages={packages} />
    </div>
  )
}

export default App
