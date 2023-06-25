import React, { useState, useEffect } from "react"
import { Button, Dialog, DialogBody, DialogFooter } from "@blueprintjs/core"
import Convert from "ansi-to-html"
import { useDispatch, useSelector } from "react-redux"
import { selectTheme } from "../../redux/slices/appSlice"
import { os, events } from "@neutralinojs/lib"

// Ensure just on event will be used, if we assign this later multiple events will be triggered
let currentProcessId: number | null
let currentProcessPID = 0
let onSpawnedProcess = (evt: CustomEvent) => {}
events.on("spawnedProcess", (evt) => {
  onSpawnedProcess(evt)
})

export const ConsoleView: React.FC<{
  command: string | null
  onCommandFinished?: () => void
  onClose?: () => void
}> = ({ command, onCommandFinished, onClose }) => {
  const convert = new Convert()
  const dispatch = useDispatch()
  const isDarkThemeEnabled = useSelector(selectTheme) === "dark"
  const themeClass = isDarkThemeEnabled ? "bp4-dark" : ""
  const [terminalOutput, setTerminalOutput] = useState("")

  const printMessage = (data: string) => {
    // If we have a return carriage, replace last line
    setTerminalOutput((prev) => {
      if (data.includes("\r")) {
        const lines = prev.split("\n")
        lines[lines.length - 1] = data
        return lines.join("\n")
      }
      return prev + data
    })
  }

  const runCommand = async () => {
    if (!command) return
    const { id, pid } = await os.spawnProcess(command)
    currentProcessId = id
    currentProcessPID = pid
  }

  const cancelCommand = async () => {
    if (currentProcessId === null) return
    try {
      //console.log("Canceling process", currentProcessPID)
      await os.updateSpawnedProcess(currentProcessId, "exit")
    } catch (error) {
      console.error(error)
    }
  }

  const clearConsole = () => {
    setTerminalOutput("")
  }

  const cleanUp = async () => {
    onClose && onClose()
    clearConsole()
    await cancelCommand()
  }

  useEffect(() => {
    clearConsole()
  }, [])

  useEffect(() => {
    clearConsole()
    onSpawnedProcess = (evt: CustomEvent) => {
      if (evt.detail.id === currentProcessId) {
        switch (evt.detail.action) {
          case "stdOut":
            printMessage(evt.detail.data)
            //console.log(evt.detail.data)
            break
          case "stdErr":
            printMessage(evt.detail.data)
            //console.error(evt.detail.data)
            break
          case "exit":
            //console.log(`Ping process terminated with exit code: ${evt.detail.data}`)
            currentProcessId = null
            if (onCommandFinished) {
              onCommandFinished()
            }
            break
        }
      }
    }
    if (command) runCommand()
  }, [command])

  return (
    <>
      <Dialog
        className={themeClass}
        isOpen={terminalOutput !== ""}
        onClose={() => {
          cleanUp()
        }}
        title="Mercury Console - View"
        canOutsideClickClose={false}
        icon="console"
      >
        <DialogBody>
          <div
            className={themeClass}
            style={{ whiteSpace: "pre-wrap" }}
            dangerouslySetInnerHTML={{
              __html: convert.toHtml(terminalOutput || ""),
            }}
          />
        </DialogBody>
        <DialogFooter
          actions={
            <Button
              intent="danger"
              text="CLOSE"
              onClick={() => {
                cleanUp()
              }}
            />
          }
        />
      </Dialog>
    </>
  )
}
