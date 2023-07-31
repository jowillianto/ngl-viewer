import React from "react";
import { ComponentUIDataT, mockComponentsDataMap } from "./component-data";
import ViewerContext from "./viewer-context";

type ProteinViewerP = {
  initialComponents? : Array<ComponentUIDataT>
} & React.PropsWithChildren

const ProteinViewer = ({initialComponents = [], children} : ProteinViewerP) => {
  const [components, setComponents] = React.useState(initialComponents)
  const addComponent = React.useCallback(
    (component : ComponentUIDataT) => {
      setComponents((components) => [...components, component])
    }, [setComponents]
  )
  const addComponentByType = React.useCallback(
    (type : ComponentUIDataT["type"]) => {
      if (! (type in mockComponentsDataMap)) throw Error(type + " is invalid")
      const newComponent = {
        type : type,
        props : mockComponentsDataMap[type].props, 
        config : {}
      }
      addComponent(newComponent)
    }, [addComponent]
  )
  const removeComponent = React.useCallback(
    (id : number) => {
      setComponents((components) => {
        const newComponents = components.slice()
        newComponents.slice(id, 1)
        return newComponents
      })
    }, [setComponents]
  )
  const replaceComponent = React.useCallback(
    (component : ComponentUIDataT, id : number) => {
      setComponents((components) => {
        const newComponents = components.slice()
        newComponents[id] = component
        return newComponents
      })
    }, [setComponents]
  )
  const context = React.useMemo(() => {
    return {
      components, addComponent, removeComponent, replaceComponent, 
      addComponentByType
    }
  }, [
    components, 
    addComponent, 
    removeComponent, 
    replaceComponent, 
    addComponentByType
  ])
  return (
    <ViewerContext.Provider value = {context} >
      {children}
    </ViewerContext.Provider>
  )
}

export default ProteinViewer