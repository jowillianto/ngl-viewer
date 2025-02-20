import React from "react";
import { ShapeParameters } from "ngl/dist/declarations/geometry/shape";
import StageContext from "../stage-context";
import * as NGL from "ngl";
import { ViewSettings } from "../interfaces/interfaces";
import Surface from "ngl/dist/declarations/surface/surface";

export type BasicShapeProps<T = {}> = {
  viewSettings: ViewSettings;
  name?: string;
  shapeParams?: Partial<ShapeParameters>;
  autoViewTimeout?: number;
} & T;
export type NGL_AddableComponentT =
  | NGL.Structure
  | Surface
  | NGL.Volume
  | NGL.Shape
  | NGL.Component;
export type ExtendedShapeProps<T = {}> = BasicShapeProps<{ name?: string } & T>;
export type ComponentT<T extends NGL_AddableComponentT> =
  | T
  | Promise<T | null>
  | null;

function componentToPromise<T extends NGL_AddableComponentT>(
  component: ComponentT<T> | ((stage: NGL.Stage) => ComponentT<T>),
  stage: NGL.Stage
): Promise<T | null> {
  if (component === null) return new Promise<T | null>((res, rej) => res(null));
  else if (component instanceof Promise) return component;
  else if (typeof component === "function")
    return componentToPromise(component(stage), stage);
  else return new Promise<T | null>((res, rej) => res(component));
}

class DestructableValue<T> {
  data: T | null;
  destructor: (v: T) => void;
  constructor(data: T, destructor: (v: T) => void) {
    this.data = data;
    this.destructor = destructor;
  }
  destroy() {
    if (this.data !== null) this.destructor(this.data);
    this.data = null;
  }
}

export function useComponent<T extends NGL_AddableComponentT>(
  component: ComponentT<T> | ((stage: NGL.Stage) => ComponentT<T>),
  viewSettings: ViewSettings,
  autoViewTimeout: number = 0,
  manageOnly: boolean = false
) {
  const [comp, setComp] =
    React.useState<DestructableValue<NGL.Component> | null>(null);
  const { stage: versionedStage, updateStage } = React.useContext(StageContext);
  const stage = React.useMemo(() => {
    if (versionedStage === null) return null;
    else return versionedStage.stage;
  }, [versionedStage]);
  const addComponent = React.useCallback(
    (v: T | null, stage: NGL.Stage) => {
      if (v === null) return v;
      if (v instanceof NGL.Component) {
        if (manageOnly) return v;
        stage?.addComponent(v);
        return v;
      } else {
        const c = stage?.addComponentFromObject(v);
        if (!c) return null;
        return c;
      }
    },
    [manageOnly]
  );
  React.useEffect(() => {
    if (comp === null) return;
    return () => {
      comp?.destroy();
    };
  }, [comp]);
  React.useEffect(() => {
    if (stage === null) {
      setComp(null);
      return;
    }
    componentToPromise(component, stage)
      .then((comp) => {
        const component = addComponent(comp, stage);
        if (component === null) {
          setComp(null);
        } else {
          setComp(
            new DestructableValue(component, (v) => stage.removeComponent(v))
          );
          viewSettings.forEach((viewSetting) =>
            component.addRepresentation(viewSetting.type, viewSetting.params)
          );
          if (autoViewTimeout >= 0) stage.autoView(autoViewTimeout);
          updateStage();
        }
      })
      .catch((err) => console.error(err));
  }, [
    stage,
    component,
    viewSettings,
    autoViewTimeout,
    addComponent,
    updateStage,
  ]);
  return comp;
}
