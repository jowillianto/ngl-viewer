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

export function useComponent<T extends NGL_AddableComponentT>(
  component: ComponentT<T> | ((stage: NGL.Stage) => ComponentT<T>),
  viewSettings: ViewSettings,
  autoViewTimeout: number = 0,
  manageOnly: boolean = false
) {
  const [comp, setComp] = React.useState<NGL.Component | null>(null);
  const { stage: versionedStage, updateStage } = React.useContext(StageContext);
  const stage = React.useMemo(() => {
    if (versionedStage === null) return null;
    else return versionedStage.stage;
  }, [versionedStage]);
  const removeComponent = React.useCallback(() => {
    setComp((prevComp) => {
      if (stage !== null && prevComp !== null) {
        stage.removeComponent(prevComp);
        updateStage();
      }
      return null;
    });
  }, [stage, updateStage]);
  const addComponent = React.useCallback(
    (v: T | null) => {
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
    [stage, manageOnly]
  );
  React.useEffect(() => {
    if (stage === null) return;
    componentToPromise(component, stage)
      .then((comp) => {
        const component = addComponent(comp);
        if (component === null) return;
        setComp(component)
        viewSettings.forEach((viewSetting) =>
          component.addRepresentation(viewSetting.type, viewSetting.params)
        );
        if (autoViewTimeout >= 0) stage.autoView(autoViewTimeout);
        updateStage();
      })
      .catch((err) => console.error(err));
    return removeComponent;
  }, [
    stage,
    component,
    viewSettings,
    removeComponent,
    autoViewTimeout,
    addComponent,
    updateStage,
  ]);
  console.log(stage);
  return comp;
}
