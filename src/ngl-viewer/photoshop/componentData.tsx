// ComponentData.ts
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
  | GenericComponentData<"file", NGLFileProps>


  export const mockComponentsData: ComponentDataT[] = [
    {
      type: "arrow",
      props: {
        position1: [0, 0, 0],
        position2: [2, 2, 2],
        color: [255, 0, 0],
        radius: 0.5,
        viewSettings: [],
        shapeParams: {},
        name: "Arrow",
      },
    },
    {
      type: "box",
      props: {
        position: [1, 1, 1],
        color: [0, 255, 0],
        size: 1,
        heightAxis: [0, 1, 0],
        depthAxis: [1, 0, 0],
        viewSettings: [],
        shapeParams: {},
        name: "Box",
      },
    },
    {
      type: "cone",
      props: {
        position1: [2, 2, 2],
        position2: [3, 3, 3],
        color: [0, 0, 255],
        radius: 1,
        viewSettings: [],
        shapeParams: {},
        name: "Cone",
      },
    },
    {
      type:'cylinder',
      props:{
          position1:[0, 1, 2],
          position2:[2, 3, 1],
          color:[255, 255, 0],
          radius:0.75,
          viewSettings:[],
          name:'Cylinder'
      }
    },
    {
      type:'sphere',
      props:{
          position:[3, 3, 3],
          color:[150, 200, 255],
          radius:1.5,
          name:'Sphere',
          viewSettings:[]
      }
    },
    {
      type:'ellipsoid',
      props:{
          position:[4, 4, 4],
          majorAxis:[2, 1, 3],
          minorAxis:[1, 2, 1],
          color:[255, 255, 255],
          radius:2,
          viewSettings:[],
          name:'Ellipsoid'
      }
    },
    {
      type:'octahedron',
      props:{
          position:[5, 5, 5],
          heightAxis:[1, 2, 3],
          depthAxis:[3, 2, 1],
          color:[150, 150, 200],
          size:1.5,
          viewSettings:[],
          name:'Octahedron',
      }
    },
    {
      type:'text',
      props:{
          position:[0, 0, -1],
          text:'Hello World',
          color:[100, 255, 200],
          size:0.5,
          viewSettings:[],
          name:'Text'
      }
    },
    {
      type:'torus',
      props:{
          position:[-1, -1, -1],
          majorAxis:[1, 1, 1],
          minorAxis:[0, 0, 0],
          color:[200, 200, 150],
          radius:2,
          viewSettings:[],
          name:'Torus',
      }
    },
    {
      type:'tetrahedron',
      props:{
          position:[2, 3, 4],
          depthAxis:[1, 2, 3],
          heightAxis:[3, 2, 1],
          color:[200, 150, 150],
          size:1,
          viewSettings:[],
          name:'Tetrahedron',
      }
    },
    {
      type:'file',
      props:{
        file:'rscb://7rdr',
        viewSettings:[],
      }
    }
  ];
  
