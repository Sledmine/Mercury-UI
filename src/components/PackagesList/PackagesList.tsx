import React from "react"
import "./PackagesList.css"

import { Button, Card, Elevation } from "@blueprintjs/core"
import { Icon } from "@blueprintjs/core"
import MercuryPackage from "../../types/MercuryPackage"

interface PackageListProps {
  packages?: MercuryPackage[]
}

export const PackagesList: React.FC<PackageListProps> = ({ packages = [] }) => {
  return (
    <>
      {packages.map(pack => (
        <Card key={pack.name} interactive={true} elevation={Elevation.TWO}>
          <h5>
            <Icon icon="box" size={20} />
            <a href="#"> {pack.name}</a>
          </h5>
          <p>{pack.description}</p>
          <Button>Install</Button>
        </Card>
      ))}
    </>
  )
}

export default PackagesList
