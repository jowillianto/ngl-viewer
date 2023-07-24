// types.ts
import { createContext } from "react";
import { ComponentDataT, ComponentUIDataT } from "./componentData";


export type ContextTypeT = {
  components : ComponentUIDataT[];
  addComponent : (component : ComponentUIDataT) => void
  replaceComponent : (component : ComponentUIDataT, id : number) => void
  removeComponent : (id : number) => void
  addComponentByType: (component: ComponentUIDataT["type"]) => void
}


const PhotoShopContext = createContext<ContextTypeT>({
  components: [],
  addComponent: () => {},
  replaceComponent: () => {},
  removeComponent: () => {},
  addComponentByType: () => {}
});

export default PhotoShopContext;

 