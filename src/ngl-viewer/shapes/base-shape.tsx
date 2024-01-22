import React, { useEffect, useContext, useState } from 'react';
import { ShapeParameters } from 'ngl/dist/declarations/geometry/shape';
import StageContext from '../stage-context';
import * as NGL from 'ngl';
import { ViewSetting, ViewSettingType, ViewSettings } from '../interfaces/interfaces';

export type BasicShapeProps<T = {}> = {
  viewSettings: ViewSettings;
  shapeParams?: Partial<ShapeParameters>;
} & T;

export type ExtendedShapeProps<T = {}> = BasicShapeProps<{ name?: string } & T>;

export type BaseShapeProps = BasicShapeProps<{
  addShape: (shape: NGL.Shape) => NGL.Shape;
  hash: any;
}>;

export type BaseShapeState = {
  component: NGL.Component | null;
};

const BaseShape: React.FC<BaseShapeProps> = (props) => {
  const context = useContext(StageContext);
  const [component, setComponent] = useState<NGL.Component | null>(null);

  useEffect(() => {
    addShapeFromProps();
    return () => {
      removeComponentIfExist();
    };
  }, [props.hash, context.stage]);

  const addShapeFromProps = () => {
    removeComponentIfExist();

    const shapeParams = props.shapeParams;
    const shape = new NGL.Shape('shape', shapeParams);
    const modShape = props.addShape(shape);
    const stage = context.stage;

    if (stage) {
      const newComponent = stage.addComponentFromObject(modShape);
      if (newComponent) {
        const viewSettings = props.viewSettings;
        viewSettings.forEach((viewSetting: ViewSetting<ViewSettingType, Record<string, number>>) => {
          newComponent.addRepresentation(viewSetting.type, viewSetting.params);
        });
        stage.autoView();
        context.updateVersion();
        setComponent(newComponent);
      }
    }
  };

  const removeComponentIfExist = () => {
    if (component) {
      context.stage?.removeComponent(component);
    }
  };

  const removeShape = () => {
    const stage = context.stage;
    if (stage && component) {
      stage.removeComponent(component);
    }
  };

  return <></>;
};

export default BaseShape;
