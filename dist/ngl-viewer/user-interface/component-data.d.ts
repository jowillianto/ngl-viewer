import { NGLArrowProps } from "../shapes/arrow";
import { NGLBoxProps } from "../shapes/box";
import { NGLCylinderProps } from "../shapes/cylinder";
import { NGLEllipsoidProps } from "../shapes/ellipsoid";
import { NGLOctahedronProps } from "../shapes/octahedron";
import { NGLSphereProps } from "../shapes/sphere";
import { NGLConeProps } from "../shapes/cone";
import { NGLTextProps } from "../shapes/text";
import { NGLTorusProps } from "../shapes/torus";
import { NGLTetrahedronProps } from "../shapes/tetrahedron";
import { NGLFileProps } from "../file/file";
export type ComponentType = ComponentDataT["type"];
export type GenericComponentData<T, P> = {
    type: T;
    props: P;
};
export type ComponentDataT = GenericComponentData<"arrow", NGLArrowProps> | GenericComponentData<"box", NGLBoxProps> | GenericComponentData<"cone", NGLConeProps> | GenericComponentData<"ellipsoid", NGLEllipsoidProps> | GenericComponentData<"torus", NGLTorusProps> | GenericComponentData<"sphere", NGLSphereProps> | GenericComponentData<"cylinder", NGLCylinderProps> | GenericComponentData<"tetrahedron", NGLTetrahedronProps> | GenericComponentData<"text", NGLTextProps> | GenericComponentData<"octahedron", NGLOctahedronProps> | GenericComponentData<"file", NGLFileProps>;
export type ComponentUIDataT = {
    type: ComponentDataT["type"];
    props: ComponentDataT["props"];
    config: {};
};
export declare const mockComponentsDataMap: Record<ComponentUIDataT["type"], ComponentUIDataT>;
