import React from "react";
import {
  ExtendedShapeProps,
  useComponent,
} from "./base-shape";
import * as NGL from "ngl";

export type NGLTextProps = ExtendedShapeProps<{
  position: NGL.Vector3 | [number, number, number];
  text: string;
  size: number;
  color: [number, number, number] | NGL.Color;
}>;

export default function NGLText({
  position,
  text,
  size,
  color,
  viewSettings,
  shapeParams,
  autoViewTimeout,
}: NGLTextProps) {
  const shapeCreator = React.useMemo(() => {
    return new NGL.Shape(undefined, shapeParams).addText(
      position,
      color,
      size,
      text
    );
  }, [position, color, size, text, shapeParams]);
  useComponent(shapeCreator, viewSettings, autoViewTimeout);
  return <></>;
}
