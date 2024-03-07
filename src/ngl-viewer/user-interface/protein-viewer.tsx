import React, { useState } from "react";
import { ComponentUIDataT, mockComponentsDataMap } from "./component-data";
import ViewerContext from "./viewer-context";
import StageContext from "../stage-context";
import * as NGL from 'ngl'

type CompatFunc = (component : ComponentUIDataT[]) => ComponentUIDataT[]

type ProteinViewerP = React.PropsWithChildren<{
  initialComponents? : Array<ComponentUIDataT>
  components? : Array<ComponentUIDataT>
  onComponentsChange? : (arr : Array<ComponentUIDataT>) => void
}>

const ProteinViewer = (props : ProteinViewerP) => {
  const { initialComponents = [], children, onComponentsChange } = props
  const [stage, setStage] = useState<NGL.Stage | null>(null)
  const [version, setVersion] = useState(0)
  const [internalComp, setInternalComp] = React.useState(
    props.components ? props.components : initialComponents
  )
  const nodeRef = React.createRef<HTMLDivElement>()
  const components = React.useMemo(() => {
    return props.components ? props.components : internalComp
  }, [ props.components, internalComp ])
  const setComponents = React.useCallback(
    (comp : CompatFunc) => {
      setInternalComp((components) => {
        const newComponents = comp(components)
        if (onComponentsChange) onComponentsChange(components)
        return newComponents
      })
    }, [onComponentsChange, setInternalComp]
  )
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
      addComponent(newComponent as ComponentUIDataT) //TODO: Fix this
    }, [addComponent]
  )
  const removeComponent = React.useCallback(
    (id : number) => {
      setComponents((components) => {
        const newComponents = components.slice()
        newComponents.splice(id, 1)
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
      addComponentByType, node : nodeRef
    }
  }, [
    components, 
    addComponent, 
    removeComponent, 
    replaceComponent, 
    addComponentByType,
    nodeRef
  ])
  const updateStage = React.useCallback((stage : NGL.Stage)=>{
    setStage(stage)
    setVersion((version) => version + 1)
  }, [ ])
  const updateVersion = React.useCallback(() => {
    setVersion((version) => version + 1)
  }, [ ])
  const stageContext = React.useMemo(() => {
    return {stage, version, setStage: updateStage, updateVersion}
  }, [stage, updateStage, version, updateVersion])
  
  return (
    <ViewerContext.Provider value = {context} >
      <StageContext.Provider value = {stageContext}>
        <div className = 'protein-viewer' ref = {nodeRef}>
          {children}
        </div>
      </StageContext.Provider>
    </ViewerContext.Provider>
  )
}

export default ProteinViewer