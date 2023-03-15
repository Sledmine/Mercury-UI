import { os } from "@neutralinojs/lib"
import MercuryPackage from "../types/MercuryPackage"

const mercury = {
  fetch: async () => {
    const { stdOut } = await os.execCommand("mercury fetch --json")
    const data = JSON.parse(stdOut)
    return Object.keys(data).map((key) => data[key]) as MercuryPackage[]
  },
  install: async (label: string) => {
    const { exitCode, stdOut } = await os.execCommand(
      `mercury install ${label}`
    )
    return { isInstalled: exitCode === 0, stdOut }
  },
}

export default mercury
