import React, { useEffect } from "react"

import { Button, Dialog, DialogBody, DialogFooter } from "@blueprintjs/core"
import Convert from "ansi-to-html"
import { useDispatch, useSelector } from "react-redux"
import {
  clearErrors,
  selectErrors,
  selectTheme,
} from "../../redux/slices/appSlice"
import { os, events } from "@neutralinojs/lib"

export const ConsoleView: React.FC<{
  command: string
}> = ({ command }) => {
  const convert = new Convert()
  const dispatch = useDispatch()
  const isDarkThemeEnabled = useSelector(selectTheme) === "dark"
  const themeClass = isDarkThemeEnabled ? "bp4-dark" : ""
  const [stdOut, setStdOut] = React.useState("")
  const [stdErr, setStdErr] = React.useState("")

  useEffect(() => {
    const runCommand = async () => {
      const { id, pid } = await os.spawnProcess(command)
      console.log(id, pid)

      events.on("spawnedProcess", (evt) => {
        if (id == evt.detail.id) {
          switch (evt.detail.action) {
            case "stdOut":
              console.log(evt.detail.data)
              setStdOut((prev) => prev + evt.detail.data)
              break
            case "stdErr":
              setStdErr((prev) => prev + evt.detail.data)
              console.error(evt.detail.data)
              break
            case "exit":
              console.log(
                `Ping process terminated with exit code: ${evt.detail.data}`
              )
              setStdOut("")
              setStdErr("")
              break
          }
        }
      })
    }
    runCommand()
  }, [command])

  return (
    <Dialog
      className={themeClass}
      isOpen={stdOut.length > 0 || stdErr.length > 0}
      onClose={() => {
        setStdOut("")
        setStdErr("")
      }}
      title="Mercury Console - View"
    >
      <DialogBody>
        <div
          className={themeClass}
          style={{ whiteSpace: "pre-wrap" }}
          dangerouslySetInnerHTML={{ __html: convert.toHtml(stdOut || "") }}
        />
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
  )
}
