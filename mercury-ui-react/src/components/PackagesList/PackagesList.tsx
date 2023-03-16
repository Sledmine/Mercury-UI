import React from "react"
import "./PackagesList.css"
import { Button, Card, Elevation, Tag, InputGroup } from "@blueprintjs/core"
import { Icon } from "@blueprintjs/core"
import { useDispatch, useSelector } from "react-redux"
import { pushError, selectTheme, setIsLoading } from "../../redux/slices/appSlice"
import MercuryPackage from "../../types/MercuryPackage"
import mercury from "../../mercury"

interface PackageListProps {
  packages?: MercuryPackage[]
}

export const PackagesList: React.FC<PackageListProps> = ({ packages = [] }) => {
  const currentTheme = useSelector(selectTheme)
  const [searchTerm, setSearchTerm] = React.useState("")
  const dispatch = useDispatch()

  const install = async (label: string) => {
    try {
      dispatch(setIsLoading(true))
      await mercury.install(label)
      dispatch(setIsLoading(false))
    } catch (error) {
      dispatch(setIsLoading(false))
      console.error(error)
    }
  }

  const update = async (label: string) => {
    try {
      dispatch(setIsLoading(true))
      const { isUpdated, stdOut } = await mercury.update(label)
      if (!isUpdated) {
        dispatch(pushError(stdOut))
      }
      dispatch(setIsLoading(false))
    } catch (error) {
      dispatch(setIsLoading(false))
      console.error(error)
    }
  }

  const remove = async (label: string) => {
    try {
      dispatch(setIsLoading(true))
      const { isRemoved, stdOut } = await mercury.remove(label)
      dispatch(setIsLoading(false))
      if (!isRemoved) {
        dispatch(pushError(stdOut))
      }
    } catch (error) {
      dispatch(setIsLoading(false))
      console.error(error)
    }
  }

  return (
    <>
      <InputGroup
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value.toLowerCase())
        }}
        leftIcon="search"
        placeholder="Search packages..."
        large
        style={{
          backgroundColor: currentTheme === "dark" ? "#1f2329" : undefined,
        }}
      />
      {packages
        .filter((pack) => {
          return pack.name.toLowerCase().includes(searchTerm)
        })
        .map((pack) => (
          <Card key={pack.name} interactive={true}>
            <h2>
              <Icon icon="box" size={24} />
              <a href="#"> {pack.name}</a>{" "}
              {pack.category && <Tag>{pack.category}</Tag>}
            </h2>
            <h3>Version: {pack.version}</h3>
            <p>{pack.description}</p>
            <div>
              {pack.mirrors && (
                <Button
                  icon="cloud-download"
                  onClick={() => install(pack.label)}
                >
                  Install
                </Button>
              )}
              {pack.files && (
                <Button icon="refresh" onClick={() => update(pack.label)}>
                  Update
                </Button>
              )}{" "}
              {pack.files && (
                <Button
                  intent="danger"
                  icon="delete"
                  onClick={() => remove(pack.label)}
                >
                  Remove
                </Button>
              )}
            </div>
          </Card>
        ))}
    </>
  )
}

export default PackagesList
