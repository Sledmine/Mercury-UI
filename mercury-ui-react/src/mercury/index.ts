import { os } from "@neutralinojs/lib"
import MercuryPackage from "../types/MercuryPackage"

const mercury = {
  fetch: async () => {
    const { exitCode, stdOut } = await os.execCommand("mercury fetch --json")
    if (exitCode !== 0) {
      throw new Error("Failed to fetch packages, make sure Mercury is installed")
    }
    const data = JSON.parse(stdOut)
    return Object.keys(data).map((key) => data[key]) as MercuryPackage[]
  },
  install: async (label: string) => {
    const { exitCode, stdOut } = await os.execCommand(
      `mercury install ${label}`
    )
    return { isInstalled: exitCode === 0, stdOut }
  },
  remove: async (label: string) => {
    const { exitCode, stdOut } = await os.execCommand(`mercury remove ${label}`)
    return { isRemoved: exitCode === 0, stdOut }
  },
  update: async (label: string) => {
    const { exitCode, stdOut } = await os.execCommand(`mercury update ${label}`)
    return { isUpdated: exitCode === 0, stdOut }
  },
  list: async () => {
    const { stdOut } = await os.execCommand("mercury list --json")
    const data = JSON.parse(stdOut)
    return Object.keys(data).map((key) => data[key]) as MercuryPackage[]
  },
}

export default mercury
