import React, { useEffect } from "react"

export const BrowserTuner = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      // Source: https://javascript.plainenglish.io/how-to-disable-the-right-click-menu-in-react-f600a79f133b
      const handleContextMenu = (e: any) => {
        // prevent the right-click menu from appearing
        e.preventDefault()
      }

      document.addEventListener("contextmenu", handleContextMenu)

      return () => {
        document.removeEventListener("contextmenu", handleContextMenu)
      }
    }
  }, [])

  return <></>
}
