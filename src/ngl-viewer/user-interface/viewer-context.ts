// types.ts
import React from "react";
import { 
  ComponentUIDataT 
} from "./component-data";

export type ViewerContextTypeT = {
  components : Array<ComponentUIDataT>
  addComponent : (component : ComponentUIDataT) => void
  replaceComponent : (component : ComponentUIDataT, id : number) => void
  removeComponent : (id : number) => void
  addComponentByType : (type : ComponentUIDataT["type"]) => void
}

const ViewerContext = React.createContext<ViewerContextTypeT>({
  components : [],
  addComponent : () => {},
  replaceComponent : () => {},
  removeComponent : () => {},
  addComponentByType : () => {},
})

export default ViewerContext

 