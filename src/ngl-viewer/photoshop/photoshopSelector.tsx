import React, { useState, useContext } from "react";
import { ComponentUIDataT } from "./componentData";
import Select from "react-select";
import PhotoShopContext from "./context";

type OptionData = {
  label: string;
  value: ComponentUIDataT["type"];
};

interface SelectorP {
  options: Array<ComponentUIDataT["type"]>;
}

export const PhotoshopSelector = ({ options }: SelectorP) => {
  const [selectedComponent, setSelectedComponent] = useState<
    OptionData["value"] | null
  >(null);
  const { addComponentByType } = useContext(PhotoShopContext);

  const handleSelectChange = (selectedOption: OptionData | null) => {
    if (selectedOption) setSelectedComponent(selectedOption.value);
  };

  const addToContext = () => {
    if (!selectedComponent) return;
    addComponentByType(selectedComponent);
  };

  const makeOptions = (): Array<OptionData> => {
    return options.map((val, id) => {
      return {
        label: val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(),
        value: val,
      };
    });
  };

  return (
    <div>
      <div>
        <Select options={makeOptions()} onChange={handleSelectChange} />
      </div>
      <div>
        <button onClick={addToContext}>Add</button>
      </div>
    </div>
  );
};
