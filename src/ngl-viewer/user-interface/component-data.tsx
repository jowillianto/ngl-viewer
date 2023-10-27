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

export type ComponentType = ComponentDataT["type"];

export type GenericComponentData<T, P> = {
  type: T;
  props: P;
};

export type ComponentDataTuple = [
  GenericComponentData<"arrow", NGLArrowProps>
  , GenericComponentData<"box", NGLBoxProps>
  , GenericComponentData<"cone", NGLConeProps>
  , GenericComponentData<"ellipsoid", NGLEllipsoidProps>
  , GenericComponentData<"torus", NGLTorusProps>
  , GenericComponentData<"sphere", NGLSphereProps>
  , GenericComponentData<"cylinder", NGLCylinderProps>
  , GenericComponentData<"tetrahedron", NGLTetrahedronProps>
  , GenericComponentData<"text", NGLTextProps>
  , GenericComponentData<"octahedron", NGLOctahedronProps>
  , GenericComponentData<"file", NGLFileProps>
]

export type ComponentDataT = ComponentDataTuple[number]

export type ComponentUIDataT = {
  [K in keyof ComponentDataTuple] : ComponentDataTuple[K] & {config : {}} 
}[number];


export const view_settings_type = {
  surface: [
    {
      type: "cartoon",
      params: { colorScheme: "element" },
    },
    {
      type: "surface",
      params: {
        sele: "polymer",
        opacity: "0.5",
        colorScheme: "electrostatic",
        colorDomain: [-80, 80],
        surfaceType: "av",
      },
    },
  ],
  licorice: [
    {
      type: "ball+stick",
      params: {},
    },
  ],
  cartoon: [
    {
      type: "cartoon",
      params: {},
    },
  ],
}


export const mockComponentsDataMap: Record<
  ComponentUIDataT["type"],
  ComponentUIDataT
> = {
  arrow: {
    type: "arrow",
    props: {
      position1: [0, 0, 0],
      position2: [2, 2, 2],
      color: [255, 0, 0],
      radius: 0.5,
      viewSettings: [
        {
          type: "zoom",
          params: {
            zoomLevel: 1,
          },
        },
        {
          type: "rotation",
          params: {
            x: 45,
            y: 90,
            z: 180,
          },
        },
      ],
      shapeParams: {},
      name: "Arrow",
    },
    config: {},
  },
  box: {
    type: "box",
    props: {
      position: [1, 1, 1],
      color: [0, 255, 0],
      size: 1,
      heightAxis: [0, 1, 0],
      depthAxis: [1, 0, 0],
      viewSettings: [
        {
          type: "zoom",
          params: {
            zoomLevel: 2,
          },
        },
        {
          type: "rotation",
          params: {
            x: 90,
            y: 180,
            z: 270,
          },
        },
      ],
      shapeParams: {},
      name: "Box",
    },
    config: {},
  },

  cone: {
    type: "cone",
    props: {
      position1: [2, 2, 2],
      position2: [3, 3, 3],
      color: [0, 0, 255],
      radius: 1,
      viewSettings: [
        {
          type: "zoom",
          params: {
            zoomLevel: 1,
          },
        },
        {
          type: "rotation",
          params: {
            x: 0,
            y: 0,
            z: 180,
          },
        },
      ],
      shapeParams: {},
      name: "Cone",
    },
    config: {},
  },

  cylinder: {
    type: "cylinder",
    props: {
      position1: [0, 1, 2],
      position2: [2, 3, 1],
      color: [255, 255, 0],
      radius: 0.75,
      viewSettings: [
        {
          type: "zoom",
          params: {
            zoomLevel: 2,
          },
        },
        {
          type: "rotation",
          params: {
            x: 45,
            y: 90,
            z: 135,
          },
        },
      ],
      name: "Cylinder",
    },
    config: {},
  },

  sphere: {
    type: "sphere",
    props: {
      position: [3, 3, 3],
      color: [150, 200, 255],
      radius: 1.5,
      name: "Sphere",
      viewSettings: [
        {
          type: "zoom",
          params: {
            zoomLevel: 0,
          },
        },
        {
          type: "rotation",
          params: {
            x: 30,
            y: 30,
            z: 60,
          },
        },
      ],
    },
    config: {},
  },

  ellipsoid: {
    type: "ellipsoid",
    props: {
      position: [4, 4, 4],
      majorAxis: [2, 1, 3],
      minorAxis: [1, 2, 1],
      color: [255, 255, 255],
      radius: 2,
      viewSettings: [
        {
          type: "zoom",
          params: {
            zoomLevel: 1,
          },
        },
        {
          type: "rotation",
          params: {
            x: 0,
            y: 180,
            z: 0,
          },
        },
      ],
      name: "Ellipsoid",
    },
    config: {},
  },

  octahedron: {
    type: "octahedron",
    props: {
      position: [5, 5, 5],
      heightAxis: [1, 2, 3],
      depthAxis: [3, 2, 1],
      color: [150, 150, 200],
      size: 1.5,
      viewSettings: [
        {
          type: "zoom",
          params: {
            zoomLevel: 2,
          },
        },
        {
          type: "rotation",
          params: {
            x: 45,
            y: 45,
            z: 45,
          },
        },
      ],
      name: "Octahedron",
    },
    config: {},
  },

  text: {
    type: "text",
    props: {
      position: [0, 0, -1],
      text: "Hello World",
      color: [100, 255, 200],
      size: 0.5,
      viewSettings: [
        {
          type: "zoom",
          params: {
            zoomLevel: 1,
          },
        },
      ],
      name: "Text",
    },
    config: {},
  },

  torus: {
    type: "torus",
    props: {
      position: [-1, -1, -1],
      majorAxis: [7, 3, 1],
      minorAxis: [0, -1, 0],
      color: [200, 200, 150],
      radius: 2,
      viewSettings: [
        {
          type: "zoom",
          params: {
            zoomLevel: 0,
          },
        },
        {
          type: "rotation",
          params: {
            x: 90,
            y: 0,
            z: 0,
          },
        },
      ],
      name: "Torus",
    },
    config: {},
  },

  tetrahedron: {
    type: "tetrahedron",
    props: {
      position: [2, 3, 4],
      depthAxis: [1, 2, 3],
      heightAxis: [3, 2, 1],
      color: [200, 150, 150],
      size: 1,
      viewSettings: [
        {
          type: "zoom",
          params: {
            zoomLevel: 1,
          },
        },
        {
          type: "rotation",
          params: {
            x: 30,
            y: 60,
            z: 90,
          },
        },
      ],
      name: "Tetrahedron",
    },
    config: {},
  },

  file: {
    type: "file",
    props: {
      file: null,
      viewSettings: [
        {
          type: "cartoon",
          params: {},
        },
        
      ],
    },
    config: {},
  },
};
export const componentTypes = Object.keys(
  mockComponentsDataMap
) as ComponentDataT["type"][];
