import React from "react";
import { ExtendedShapeProps, useComponent } from "./base-shape";
import * as NGL from "ngl";
import { randomString } from "../utils/utils";

export type NGLSphereProps = ExtendedShapeProps<{
  position: NGL.Vector3 | [number, number, number];
  color: [number, number, number] | NGL.Color;
  radius: number;
}>;

export default function NGLSphere({
  name,
  position,
  color,
  radius,
  shapeParams,
  viewSettings,
  autoViewTimeout,
}: NGLSphereProps) {
  const shapeCreator = React.useMemo(() => {
    return new NGL.Shape(undefined, shapeParams).addSphere(
      position,
      color,
      radius,
      name === undefined ? randomString(10) : name
    );
  }, [name, position, color, radius, shapeParams]);
  useComponent(shapeCreator, viewSettings, autoViewTimeout);
  return <></>;
}
