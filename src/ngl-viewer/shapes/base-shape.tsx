import React from "react";
import { ShapeParameters } from "ngl/dist/declarations/geometry/shape";
import { useStage } from "../stage-context";
import * as NGL from "ngl";
import { ViewSettings } from "../interfaces/interfaces";
import Surface from "ngl/dist/declarations/surface/surface";

export type BasicShapeProps<T = {}> = {
  viewSettings: ViewSettings;
  name?: string;
  shapeParams?: Partial<ShapeParameters>;
} & T;

export type ExtendedShapeProps<T = {}> = BasicShapeProps<{ name?: string } & T>;
export type ComponentT<T extends NGL.Component> = T | Promise<T | null> | null;

function componentToPromise<T extends NGL.Component>(
  component: ComponentT<T> | ((stage: NGL.Stage) => ComponentT<T>),
  stage: NGL.Stage
): Promise<T | null> {
  if (component === null) return new Promise<T | null>((res, rej) => res(null));
  else if (component instanceof Promise) return component;
  else if (typeof component === "function")
    return componentToPromise(component(stage), stage)
  else return new Promise<T | null>((res, rej) => res(component));
}

export default function useComponent<T extends NGL.Component>(
  component: ComponentT<T> | ((stage: NGL.Stage) => ComponentT<T>),
  viewSettings: ViewSettings,
  autoViewTimeout : number = 0
) {
  const [comp, setComp] = React.useState<T | null>(null);
  const stage = useStage();
  const removeComponent = React.useCallback(() => {
    setComp((prevComp) => {
      if (stage !== null && prevComp !== null) {
        stage.removeComponent(prevComp);
      }
      return null;
    });
  }, [stage]);
  React.useEffect(() => {
    if (stage === null) return;
    componentToPromise(component, stage).then((comp) => {
      if (comp === null) return;
      setComp(comp);
      stage.addComponent(comp);
      stage.autoView(autoViewTimeout)
      viewSettings.forEach((viewSetting) =>
        comp.addRepresentation(viewSetting.type, viewSetting.params)
      );
    })
    .catch((err) => console.error(err))
    return removeComponent
  }, [stage, component, viewSettings, removeComponent, autoViewTimeout]);
  return comp;
}

export function useComponentFromObject(
  obj: NGL.Structure | Surface | NGL.Volume | NGL.Shape | null,
  viewSettings: ViewSettings
) {
  const objCreator = React.useCallback(
    (stage: NGL.Stage) => {
      if (obj === null || stage === null) return null;
      const component = stage.addComponentFromObject(obj);
      if (!component) return null;
      return component;
    },
    [obj]
  );
  return useComponent(objCreator, viewSettings);
}
