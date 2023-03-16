import React from "react"
import "./PackagesList.css"
import { Button, Card, Elevation, Tag, InputGroup } from "@blueprintjs/core"
import { Icon } from "@blueprintjs/core"
import { useSelector } from "react-redux"
import { selectTheme } from "../../redux/slices/appSlice"
import MercuryPackage from "../../types/MercuryPackage"

interface PackageListProps {
  packages?: MercuryPackage[]
}

export const PackagesList: React.FC<PackageListProps> = ({ packages = [] }) => {
  const currentTheme = useSelector(selectTheme)
  const [searchTerm, setSearchTerm] = React.useState("")

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
              {pack.mirrors && <Button icon="cloud-download">Install</Button>}
              {pack.files && <Button icon="refresh">Update</Button>}{" "}
              {pack.files && <Button intent="danger" icon="delete">Remove</Button>}
            </div>
          </Card>
        ))}
    </>
  )
}

export default PackagesList
