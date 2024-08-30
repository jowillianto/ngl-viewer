import React from "react";
import {
  ExtendedShapeProps,
  useComponentFromObject,
} from "./base-shape";
import * as NGL from "ngl";
import { randomString } from "../utils/utils";

export type NGLArrowProps = ExtendedShapeProps<{
  position1: NGL.Vector3 | [number, number, number];
  position2: NGL.Vector3 | [number, number, number];
  color: NGL.Color | [number, number, number];
  radius: number;
}>;

export default function NGLArrow({
  position1,
  position2,
  color,
  radius,
  name,
  viewSettings,
  shapeParams,
}: NGLArrowProps) {
  const shapeCreator = React.useMemo(
    () =>
      new NGL.Shape(undefined, shapeParams).addArrow(
        position1,
        position2,
        color,
        radius,
        name === undefined ? randomString(10) : name
      ),
    [position1, position2, color, radius, name, shapeParams]
  );
  useComponentFromObject(shapeCreator, viewSettings);
  return <></>
}