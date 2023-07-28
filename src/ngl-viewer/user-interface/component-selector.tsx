import React from "react";
import { ComponentUIDataT } from "./component-data"
import ViewerContext from "./viewer-context";
import Select from 'react-select'

type OptionData = {
  label: string;
  value: ComponentUIDataT["type"];
};

type SelectorP = {
  options : Array<ComponentUIDataT["type"]>,
  addButton? : React.ReactNode
}

type SelectorS = OptionData["value"] | null

const ViewerSelector = ({ options, addButton = 'Add' } : SelectorP) => {
  const [selected, setSelected] = React.useState<SelectorS>(null)
  const { addComponentByType } = React.useContext(ViewerContext)
  const onSelectChange = React.useCallback(
    (option : OptionData | null) => {
      if (option) setSelected(option.value)
    }, [setSelected]
  )
  const addComponent = React.useCallback(
    () => {
      if (!selected) return; 
      addComponentByType(selected)
    }, [addComponentByType, selected]
  )
  const selectorOptions = React.useMemo<OptionData[]>(() => {
    return options.map((option) => {
      return {
        label : option.charAt(0).toUpperCase() + option.slice(1).toLowerCase(),
        value : option
      }
    })
  }, [options])
  return (
    <div className = 'component-selector'>
      <div className = 'component-selector select'>
        <Select
          options = {selectorOptions}
          onChange = {onSelectChange}
        />
      </div>
      <div className = 'component-selector add'>
        <button onClick = {addComponent}>{addButton}</button>
      </div>
    </div>
  )
}

export default ViewerSelector