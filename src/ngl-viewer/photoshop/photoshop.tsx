import React, { useState, useContext } from "react";
import MyContext, { ContextTypeT }from "./context";
import { ComponentUIDataT } from "./componentData";

interface MyContextProviderProps {
  children: React.ReactNode;
}

const Photoshop: React.FC<MyContextProviderProps> = ({ children }) => {
  const [componentsArray, setComponentsArray] = useState<ComponentUIDataT[]>([]);

  const addComponent = (component: ComponentUIDataT) => {
    setComponentsArray(prevArray => [...prevArray, component]);
  };

  const removeComponent = (index: number) => {
    setComponentsArray(prevArray => prevArray.filter((_, i) => i !== index));
  };

  const replaceComponent = (updatedComponent: ComponentUIDataT, index: number) => {
    setComponentsArray(prevArray => 
      prevArray.map((component, i) => (i === index ? updatedComponent : component))
    );
  };

  const contextValue: ContextTypeT = {
    components: componentsArray,
    addComponent,
    removeComponent,
    replaceComponent
  };

  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
}

export default Photoshop;
