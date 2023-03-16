import { os } from "@neutralinojs/lib"
import MercuryPackage from "../types/MercuryPackage"

const filterColorText = (text: string) => {
  return text.replace(/\x1b\[[0-9;]*m/g, "")
}

const mercury = {
  fetch: async () => {
    const { exitCode, stdOut } = await os.execCommand("mercury fetch --json")
    if (exitCode !== 0) {
      throw new Error(
        "Failed to fetch packages, make sure Mercury is installed"
      )
    }
    const data = JSON.parse(stdOut)
    return Object.keys(data).map((key) => data[key]) as MercuryPackage[]
  },
  install: async (label: string) => {
    const { exitCode, stdOut } = await os.execCommand(
      `mercury install ${label}`
    )
    return { isInstalled: exitCode === 0, stdOut: filterColorText(stdOut) }
  },
  remove: async (label: string) => {
    const { exitCode, stdOut } = await os.execCommand(`mercury remove ${label}`)
    return { isRemoved: exitCode === 0, stdOut: filterColorText(stdOut) }
  },
  update: async (label: string) => {
    const { exitCode, stdOut } = await os.execCommand(`mercury update ${label}`)
    return { isUpdated: exitCode === 0, stdOut: filterColorText(stdOut) }
  },
  list: async () => {
    try {
      const { stdOut } = await os.execCommand("mercury list --json")
      const data = JSON.parse(stdOut)
      return Object.keys(data).map((key) => data[key]) as MercuryPackage[]
    } catch (e) {
      console.error(e)
      return []
    }
  },
}

export default mercury
