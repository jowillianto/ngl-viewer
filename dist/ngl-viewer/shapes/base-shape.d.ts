import { ShapeParameters } from "ngl/dist/declarations/geometry/shape";
import * as NGL from "ngl";
import { ViewSettings } from "../interfaces/interfaces";
import Surface from "ngl/dist/declarations/surface/surface";
export type BasicShapeProps<T = {}> = {
    viewSettings: ViewSettings;
    name?: string;
    shapeParams?: Partial<ShapeParameters>;
    autoViewTimeout?: number;
} & T;
export type ExtendedShapeProps<T = {}> = BasicShapeProps<{
    name?: string;
} & T>;
export type ComponentT<T extends NGL.Component> = T | Promise<T | null> | null;
export default function useComponent<T extends NGL.Component>(component: ComponentT<T> | ((stage: NGL.Stage) => ComponentT<T>), viewSettings: ViewSettings, autoViewTimeout?: number): T | null;
export declare function useComponentFromObject(obj: NGL.Structure | Surface | NGL.Volume | NGL.Shape | null, viewSettings: ViewSettings, autoViewTimeout?: number): NGL.Component | null;
