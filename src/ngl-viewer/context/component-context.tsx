import React from 'react'
import * as NGL from 'ngl'

export interface StructureComponentContextType{
  component   : NGL.StructureComponent | null
}

const StructureComponentContext  = React.createContext<StructureComponentContextType>({
  component : null
})

export default StructureComponentContext