import React, { useState, useContext } from "react";
import { ComponentDataT } from "./componentData";
import MyContext from "./context";

var Select = require('react-select').default

type OptionData = {
  label : string,
  value : number
}

interface SelectorP {
    options: Array<ComponentDataT["type"]>
}

const PhotoshopSelector: React.FC<SelectorP> = (props) => {
  const context = useContext(MyContext);

  const [selectedComponent, setSelectedComponent] = useState<OptionData["value"] | null>(null);

  const handleSelectChange = (selectedOption: OptionData | null) => {
    if (selectedOption)
      setSelectedComponent(selectedOption.value);
  }

  const addToContext = () => {
    const selected = selectedComponent
    if (!selected) return
    const entry = props.options[selected]
    context.addComponent({ type : entry, config : {}})
  }

  const makeOptions = () : Array<OptionData> => {
    return props.options.map((val, id) => {
      return {
        label : val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(),
        value : id
      }
    })
  }

  return (
    <div>
      <Select 
        options = {makeOptions()}
        onChange = {handleSelectChange}          
      />
      <button onClick = {addToContext}>Add</button>
    </div>
  );
}

export default PhotoshopSelector;
