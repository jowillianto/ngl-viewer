import React, { useState, useContext } from "react";
import PhotoshopContext, { ContextTypeT } from "./context";
import { ComponentUIDataT } from "./componentData";
import { mockComponentsDataMap } from "./componentData";
import { PhotoshopSelector } from "./photoshopSelector";    

type PhotoshopP = {
  default? : Array<ComponentUIDataT>
} & React.PropsWithChildren

const Photoshop = (props : PhotoshopP) => {
  const [componentsArray, setComponentsArray] = useState(props.default ? props.default : []);

  const addComponent = React.useCallback((component: ComponentUIDataT) => {
    setComponentsArray((componentArray) => [...componentArray, component]);
  }, [setComponentsArray])

  const addComponentByType = React.useCallback((type: ComponentUIDataT["type"]) => {
    const newComponent: ComponentUIDataT = {
      type: mockComponentsDataMap[type].type,
      props: mockComponentsDataMap[type].props,
      config: {},
    };
    addComponent(newComponent);
  }, [addComponent])

  const removeComponent = React.useCallback((index: number) => {
    setComponentsArray((componentsArray) => componentsArray.filter((_, i) => i !== index));
  }, [setComponentsArray])


  const replaceComponent = React.useCallback((
    updatedComponent: ComponentUIDataT, index: number
  ) => {
    setComponentsArray(componentsArray => {
      const newComponents = [...componentsArray];
      newComponents[index] = updatedComponent;
      return newComponents;
    })
  }, [setComponentsArray]);
  

  const contextValue = React.useMemo(() => {
    return {
      components: componentsArray,
      addComponent,
      removeComponent,
      replaceComponent,
      addComponentByType,
    }
  }, [
    componentsArray, 
    addComponent, 
    removeComponent, 
    replaceComponent, 
    addComponentByType
  ])

  return (
    <PhotoshopContext.Provider value={contextValue}>
      {props.children}
    </PhotoshopContext.Provider>
  );
};

export default Photoshop;
