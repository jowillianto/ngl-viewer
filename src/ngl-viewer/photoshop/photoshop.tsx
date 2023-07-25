import React, { useState, useContext } from "react";
import MyContext, { ContextTypeT } from "./context";
import { ComponentUIDataT } from "./componentData";
import { mockComponentsDataMap } from "./componentData";
import { PhotoshopSelector } from "./photoshopSelector";         
interface MyContextProviderProps {
  children: React.ReactNode;
}

const Photoshop: React.FC<MyContextProviderProps> = ({ children }) => {
  const [componentsArray, setComponentsArray] = useState<ComponentUIDataT[]>([]);

  const addComponent = (component: ComponentUIDataT) => {
    setComponentsArray((componentArray) => [...componentArray, component]);
  };

  const addComponentByType = (type: ComponentUIDataT["type"]) => {
    const newComponent: ComponentUIDataT = {
      type: mockComponentsDataMap[type].type,
      props: mockComponentsDataMap[type].props,
      config: {},
    };
    addComponent(newComponent);
  };

  const removeComponent = (index: number) => {
    setComponentsArray((componentsArray) => componentsArray.filter((_, i) => i !== index));
  };


  const replaceComponent = (
    updatedComponent: ComponentUIDataT,
    index: number
  ) => {
    setComponentsArray((prevArray) =>
      prevArray.map((component, i) =>
        i === index ? updatedComponent : component
      )
    );
  };

  const contextValue: ContextTypeT = {
    components: componentsArray,
    addComponent,
    removeComponent,
    replaceComponent,
    addComponentByType,

    
  };

  return (
    <MyContext.Provider value={contextValue}>
      <PhotoshopSelector
        options={Object.values(mockComponentsDataMap)}
        onAdd={addComponentByType}  

      />
      {children}
    </MyContext.Provider>
  );
};

export default Photoshop;
