import React, { useState } from "react";
import { ComponentUIDataT } from "./componentData";
import Select from 'react-select'

type OptionData = {
  label : string,
  value : ComponentUIDataT
}

interface SelectorP {
    options: Array<ComponentUIDataT>
    onAdd: (type: ComponentUIDataT["type"]) => void
  
}

export const PhotoshopSelector: React.FC<SelectorP> = ({ options, onAdd }) => {
  const [selectedComponent, setSelectedComponent] = useState<OptionData["value"] | null>(null);
  
  const handleSelectChange = (selectedOption: OptionData | null) => {
    if (selectedOption)
      setSelectedComponent(selectedOption.value);
  }

  const addToContext = () => {
    if (!selectedComponent) return;
    onAdd(selectedComponent.type);
  };

 

  const makeOptions = (): Array<OptionData> => {
    return options.map((val, id) => {
      return {
        label: val.type.charAt(0).toUpperCase() + val.type.slice(1).toLowerCase(),
        value: val,
      };
    });
  };

  return (
    <div>
      <div>
      <Select 
        options = {makeOptions()}
        onChange = {handleSelectChange}          
      />
      </div>
      <div>
        <button onClick = {addToContext}>Add</button>
      </div>
     

    </div>
  );
}


