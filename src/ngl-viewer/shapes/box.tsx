import React from "react";
import { ExtendedShapeProps, useComponentFromObject } from "./base-shape";
import * as NGL from "ngl";
import { randomString } from "../utils/utils";

export type NGLBoxProps = ExtendedShapeProps<{
  name?: string;
  position: NGL.Vector3 | [number, number, number];
  color: [number, number, number] | NGL.Color;
  size: number;
  heightAxis: NGL.Vector3 | [number, number, number];
  depthAxis: NGL.Vector3 | [number, number, number];
}>;

export default function NGLBox({
  name,
  position,
  color,
  size,
  heightAxis,
  depthAxis,
  shapeParams,
  viewSettings,
  autoViewTimeout,
}: NGLBoxProps) {
  const shapeCreator = React.useMemo(
    () =>
      new NGL.Shape(undefined, shapeParams).addBox(
        position,
        color,
        size,
        heightAxis,
        depthAxis,
        name === undefined ? randomString(10) : name
      ),
    [name, position, color, size, heightAxis, depthAxis, shapeParams]
  );
  useComponentFromObject(shapeCreator, viewSettings, autoViewTimeout);
  return <></>;
}
