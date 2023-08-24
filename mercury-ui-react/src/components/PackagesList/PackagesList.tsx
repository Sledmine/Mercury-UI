import React from "react"
import { Button, Card, Tag, InputGroup } from "@blueprintjs/core"
import { Icon } from "@blueprintjs/core"
import { useDispatch, useSelector } from "react-redux"
import {
  pushError,
  selectTheme,
  setCommand,
  setIsLoading,
} from "../../redux/slices/appSlice"
import MercuryPackage from "../../types/MercuryPackage"
import mercury from "../../mercury"

interface PackageListProps {
  packages?: MercuryPackage[]
  triggerUpdate?: Function
}

export const PackagesList: React.FC<PackageListProps> = ({
  packages = [],
  triggerUpdate,
}) => {
  const currentTheme = useSelector(selectTheme)
  const [searchTerm, setSearchTerm] = React.useState("")
  const dispatch = useDispatch()

  const install = async (label: string) => {
    dispatch(setCommand(`mercury install ${label}`))
  }

  const update = async (label: string) => {
    try {
      dispatch(setIsLoading(true))
      const { isUpdated, stdOut } = await mercury.update(label)
      dispatch(setIsLoading(false))
      if (!isUpdated) {
        dispatch(pushError(stdOut))
      } else {
        if (triggerUpdate) {
          triggerUpdate()
        }
      }
    } catch (error) {
      dispatch(setIsLoading(false))
      //@ts-ignore
      dispatch(pushError(error.message))
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
      } else {
        if (triggerUpdate) {
          triggerUpdate()
        }
      }
    } catch (error) {
      dispatch(setIsLoading(false))
      //@ts-ignore
      dispatch(pushError(error.message))
      console.error(error)
    }
  }

  return (
    <>
      <div style={{ position: "sticky", top: 50 }}>
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
      </div>
      <div
        style={{
          height: "calc(100% - 140px)",
          width: "100%",
          position: "absolute",
          overflowY: "scroll",
        }}
      >
        {packages
          .filter((pack) => {
            return pack.name.toLowerCase().includes(searchTerm)
          })
          .map((pack) => (
            <Card key={pack.name} interactive={true}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ maxWidth: "50%" }}>
                  <div
                    style={{
                      width: "128px",
                      height: "128px",
                      backgroundImage: `url(${pack.image})`,
                      //backgroundSize: "90%",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      borderRadius: "6px",
                      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                      backgroundColor: "#1f2329",
                    }}
                  />
                </div>
                <div style={{ paddingLeft: "28px" }}>
                  <h2>
                    {/* <Icon icon="box" size={24} /> */}
                    <a href="#"> {pack.name}</a>{" "}
                    {pack.category && <Tag>{pack.category}</Tag>}
                    &nbsp;
                    {/* <Tag intent="success">NEW</Tag> */}
                  </h2>
                  <h3>Version: {pack.version}</h3>
                  <h4>Author: {pack.author}</h4>
                  <p>{pack.description}</p>
                  <>
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
                  </>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </>
  )
}

export default PackagesList
