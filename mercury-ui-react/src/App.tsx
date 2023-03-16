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
import { useDispatch, useSelector } from "react-redux"
import {
  clearErrors,
  pushError,
  selectErrors,
  selectIsLoading,
  selectPage,
  selectTheme,
  setIsLoading,
} from "./redux/slices/appSlice"
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Overlay,
  Spinner,
} from "@blueprintjs/core"

function App() {
  const dispatch = useDispatch()
  const isDarkThemeEnabled = useSelector(selectTheme) === "dark"
  const darkThemeClass = isDarkThemeEnabled ? "bp4-dark" : ""
  const isLoading = useSelector(selectIsLoading)
  const [packages, setPackages] = React.useState([] as MercuryPackage[])
  const currentPage = useSelector(selectPage)
  const errors = useSelector(selectErrors)
  const [forceUpdate, setForceUpdate] = React.useState(false)

  useEffect(() => {
    const getPackages = async () => {
      try {
        dispatch(setIsLoading(true))
        let packages = []
        if (currentPage === "available") {
          const installedPackages = await mercury.list()
          packages = await mercury.fetch()
          packages = packages.filter(
            (pack) => !installedPackages.find((p) => p.name === pack.name)
          )
        } else {
          packages = await mercury.list()
        }
        setPackages(packages)
      } catch (error) {
        dispatch(setIsLoading(false))
        //@ts-ignore
        dispatch(pushError(error.message))
      }
      dispatch(setIsLoading(false))
    }
    getPackages()
  }, [currentPage, forceUpdate])

  return (
    <div className={`App ${darkThemeClass}`}>
      <Dialog
        className={darkThemeClass}
        isOpen={errors.length > 0}
        onClose={() => dispatch(clearErrors())}
        title="Mercury - Error"
        icon="error"
      >
        <DialogBody>
          <p>{errors[0]}</p>
        </DialogBody>
        <DialogFooter
          actions={
            <Button
              intent="primary"
              text="Close"
              onClick={() => dispatch(clearErrors())}
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
        <PackagesList
          packages={packages}
          triggerUpdate={() => setForceUpdate(!forceUpdate)}
        />
      </div>
    </div>
  )
}

export default App
