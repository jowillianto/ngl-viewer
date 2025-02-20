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
export type NGL_AddableComponentT = NGL.Structure | Surface | NGL.Volume | NGL.Shape | NGL.Component;
export type ExtendedShapeProps<T = {}> = BasicShapeProps<{
    name?: string;
} & T>;
export type ComponentT<T extends NGL_AddableComponentT> = T | Promise<T | null> | null;
declare class DestructableValue<T> {
    data: T | null;
    destructor: (v: T) => void;
    constructor(data: T, destructor: (v: T) => void);
    destroy(): void;
}
export declare function useComponent<T extends NGL_AddableComponentT>(component: ComponentT<T> | ((stage: NGL.Stage) => ComponentT<T>), viewSettings: ViewSettings, autoViewTimeout?: number, manageOnly?: boolean): DestructableValue<NGL.Component> | null;
export {};
