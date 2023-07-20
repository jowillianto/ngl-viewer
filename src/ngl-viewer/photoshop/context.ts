// types.ts
import { createContext } from "react";
import { ComponentDataT } from "./componentData";


export type ContextTypeT = {
  components : ComponentDataT[];
  addComponent : (component : ComponentDataT) => void
  replaceComponent : (component : ComponentDataT, id : number) => void
  removeComponent : (id : number) => void
}


const MyContext = createContext<ContextTypeT>({
  components: [],
  addComponent: () => {},
  replaceComponent: () => {},
  removeComponent: () => {},
});

export default MyContext;

 