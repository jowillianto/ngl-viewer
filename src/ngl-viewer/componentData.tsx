// ComponentData.ts
import { NGLArrowProps } from "./shapes/arrow";
import { NGLBoxProps } from "./shapes/box";
import { NGLCylinderProps } from "./shapes/cylinder";
import { NGLEllipsoidProps } from "./shapes/ellipsoid";
import { NGLOctahedronProps } from "./shapes/octahedron";
import { NGLSphereProps } from "./shapes/sphere";
import { NGLConeProps } from "./shapes/cone";
import { NGLTextProps } from "./shapes/text";
import { NGLTorusProps } from "./shapes/torus";
import { NGLTetrahedronProps } from "./shapes/tetrahedron";



export type ComponentType = ComponentDataT["type"]

export type GenericComponentData<T, P> = {
  type: T;
  props: P;
};

export type ComponentDataT =
  | GenericComponentData<"arrow", NGLArrowProps>
  | GenericComponentData<"box", NGLBoxProps>
  | GenericComponentData<"cone", NGLConeProps>
  | GenericComponentData<"ellipsoid", NGLEllipsoidProps>
  | GenericComponentData<"torus", NGLTorusProps>
  | GenericComponentData<"sphere", NGLSphereProps>
  | GenericComponentData<"cylinder", NGLCylinderProps>
  | GenericComponentData<"tetrahedron", NGLTetrahedronProps>
  | GenericComponentData<"text", NGLTextProps>
  | GenericComponentData<"octahedron", NGLOctahedronProps>


export const mockComponentsData: ComponentDataT[] = [
  {
    type: "arrow",
    props: {
      position1: [0, 0, 0],
      position2: [1, 1, 1],
      color: [255, 0, 0],
      radius: 1,
      viewSettings: [],
      shapeParams: {},
      name: "Test Arrow",
    },
  },
  {
    type: "box",
    props: {
      position: [0, 0, 0],
      color: [0, 255, 0],
      size: 1,
      heightAxis: [0, 1, 0],
      depthAxis: [0, 0, 1],
      viewSettings: [],
      shapeParams: {},
      name: "Test Box",
    },
  },
  {
    type: "cone",
    props: {
      position1: [0, 0, 0],
      position2: [1, 1, 1],
      color: [0, 0, 255],
      radius: 1,
      viewSettings: [],
      shapeParams: {},
      name: "Test Cone",
    },
  },
  {
    type:'cylinder',
    props:{
        position1:[0, 1, 1],
        position2:[1, 1, 1],
        color:[0, 0, 220],
        radius:1,
        viewSettings:[],
        name:'Test cylinder'
    }
  },
  {
    type:'sphere',
    props:{
        position:[0, 0, 1],
        color:[150, 180, 200],
        radius:1,
        name:'Test sphere',
        viewSettings:[]
    }
  },
  {
    type:'ellipsoid',
    props:{
        position:[0, 1, 0],
        majorAxis:[1, 3, 4],
        minorAxis:[-1, 0, -3],
        color:[250, 250, 250],
        radius:2,
        viewSettings:[],
        name:'Test ellipse'
    }
  },
  {
    type:'octahedron',
    props:{
        position:[0, 1, 1],
        heightAxis:[2, 3, 2],
        depthAxis:[-2, -1, -2],
        color:[150, 150, 150],
        size:3,
        viewSettings:[],
        name:'Test octahedron',
    }
  },
  {
    type:'text',
    props:{
        position:[1, 0, 1],
        text:'Asa x Denji',
        color:[100, 150, 160],
        size:1,
        viewSettings:[],
        name:'Test text'
    }
  },
  {
    type:'torus',
    props:{
        position:[0, 1, 1],
        majorAxis:[2, 3, 2],
        minorAxis:[-2, -1, -2],
        color:[150, 150, 150],
        radius:3,
        viewSettings:[],
        name:'Test torus',
    }
  },
  {
    type:'tetrahedron',
    props:{
        position:[0, 1, 1],
        depthAxis:[-2, -3, -2],
        heightAxis:[2, 1, 2],
        color:[150, 150, 150],
        size:2,
        viewSettings:[],
        name:'Test tetrahedron',
    }
  }


];
