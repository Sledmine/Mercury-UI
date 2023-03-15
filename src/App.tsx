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
import { selectPage, selectTheme } from "./redux/slices/appSlice"
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Overlay,
  Spinner,
} from "@blueprintjs/core"

function App() {
  const isDarkThemeEnabled = useSelector(selectTheme) === "dark"
  const [isLoading, setIsLoading] = React.useState(true)
  const [packages, setPackages] = React.useState([] as MercuryPackage[])
  const currentPage = useSelector(selectPage)

  const [error, setError] = React.useState(null as string | null)

  useEffect(() => {
    const getPackages = async () => {
      try {
        let packages = []
        if (currentPage === "available") {
          setIsLoading(true)
          packages = await mercury.fetch()
          setIsLoading(false)
        } else {
          setIsLoading(true)
          packages = await mercury.list()
          setIsLoading(false)
        }
        setPackages(packages)
      } catch (error) {
        setIsLoading(false)
        //@ts-ignore
        setError(error.message)
      }
    }
    getPackages()
  }, [currentPage])

  return (
    <div className={`App ${isDarkThemeEnabled ? "bp4-dark" : ""}`}>
      <Dialog
        className="bp4-dark"
        isOpen={error != null}
        onClose={() => setError(null)}
        title="Mercury - Error"
        icon="error"
      >
        <DialogBody>
          <p>{error}</p>
        </DialogBody>
        <DialogFooter
          actions={
            <Button
              intent="primary"
              text="Close"
              onClick={() => setError(null)}
            />
          }
        />
      </Dialog>
      <Overlay isOpen={isLoading} shouldReturnFocusOnClose>
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spinner intent="primary" aria-label={"Loading..."} />
        </div>
      </Overlay>
      <NavBar />
      <div>
        <PackagesList packages={packages} />
      </div>
    </div>
  )
}

export default App
