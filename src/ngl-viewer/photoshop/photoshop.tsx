import React, { useState, useContext } from "react";
import MyContext, { ContextTypeT }from "./context";
import { ComponentUIDataT } from "./componentData";
import { mockComponentsDataMap } from "./componentData";

interface MyContextProviderProps {
  children: React.ReactNode;
}

const Photoshop: React.FC<MyContextProviderProps> = ({ children }) => {
  const [componentsArray, setComponentsArray] = useState<ComponentUIDataT[]>([{
    type : "box", 
    props : mockComponentsDataMap["box"].props, 
    config : {}
  },
  {
    type : "arrow", 
    props : mockComponentsDataMap["arrow"].props, 
    config : {}
  }]);


  const addComponent = (component: ComponentUIDataT) => {
    setComponentsArray(prevArray => [...prevArray, component]);
  };

  const addComponentByType = React.useCallback(
    (type : ComponentUIDataT["type"]) => {
      addComponent({
        type : type, props : mockComponentsDataMap[type].props, config : {}
      })
    }, [componentsArray, setComponentsArray]
  )

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
    replaceComponent,
    addComponentByType
  };

  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
}

export default Photoshop;
