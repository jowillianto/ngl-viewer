import React, { useEffect, useContext, useState } from "react";
import { ShapeParameters } from "ngl/dist/declarations/geometry/shape";
import StageContext from "../stage-context";
import * as NGL from "ngl";
import {
  ViewSetting,
  ViewSettingType,
  ViewSettings,
} from "../interfaces/interfaces";

export type BasicShapeProps<T = {}> = {
  viewSettings: ViewSettings;
  shapeParams?: Partial<ShapeParameters>;
} & T;

export type ExtendedShapeProps<T = {}> = BasicShapeProps<{ name?: string } & T>;

export type BaseShapeProps = BasicShapeProps<{
  addShape: (shape: NGL.Shape) => NGL.Shape;
}>;

export type BaseShapeState = {
  component: NGL.Component | null;
};

const BaseShape: React.FC<BaseShapeProps> = ({ addShape, shapeParams, viewSettings}) => {
  const { stage, updateVersion } = useContext(StageContext);
  const [component, setComponent] = useState<NGL.Component | null>(null);

  const addShapeFromProps = React.useCallback(() => {
    const shape = new NGL.Shape("shape", shapeParams);
    const modShape = addShape(shape);
    if (stage === null) return
    const newComponent = stage.addComponentFromObject(modShape);
    if (!newComponent) return;
    viewSettings.forEach(
      (
        viewSetting: ViewSetting<ViewSettingType, Record<string, number>>
      ) => {
        newComponent.addRepresentation(
          viewSetting.type,
          viewSetting.params
        );
      }
    );
    stage.autoView();
    updateVersion();
    setComponent(newComponent);
  }, [addShape, shapeParams, viewSettings, stage, updateVersion]);

  useEffect(() => {
    addShapeFromProps();
    return () => {
      setComponent((prevComponent) => {
        if (stage === null) return null
        if (prevComponent !== null)
          stage.removeComponent(prevComponent)
        return null
      })
    }
  }, [ addShapeFromProps, stage ]);

  return <></>;
};

export default BaseShape;
