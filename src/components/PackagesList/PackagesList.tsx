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
        .filter((pack) => {return pack.name.toLowerCase().includes(searchTerm)})
        .map((pack) => (
          <Card key={pack.name} interactive={true}>
            <h2>
              <Icon icon="box" size={20} />
              <a href="#"> {pack.name}</a> <Tag>{pack.category || "misc"}</Tag>
            </h2>
            <p>{pack.description}</p>
            <Button>Install</Button>
          </Card>
        ))}
    </>
  )
}

export default PackagesList
