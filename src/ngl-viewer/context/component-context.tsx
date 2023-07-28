import React from 'react'
import * as NGL from 'ngl'

export type StructureComponentContextT = {
  component   : NGL.StructureComponent | null
}

const StructureComponentContext = 
React.createContext<StructureComponentContextT>({
  component : null
})

export default StructureComponentContext