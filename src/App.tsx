import "./index.css";
import React from "react";
import ProteinViewer from "./ngl-viewer/user-interface/protein-viewer";
import FileComponent from "./ngl-viewer/file/file";
import ViewerStage from "./ngl-viewer/user-interface/viewer-stage";
import ViewerPanel from "./ngl-viewer/user-interface/viewer-panel";
import ViewerComponent from "./viewer-component";
import { ComponentUIDataT } from "./ngl-viewer/user-interface/component-data";
import NGLBox from "./ngl-viewer/shapes/box";

const exampleComponentUIData: ComponentUIDataT = {
  type: "box",
  props: {
    position: [1, 1, 1],
    color: [255, 255, 0],
    size: 1,
    heightAxis: [0, 1, 0],
    depthAxis: [1, 0, 0],
    viewSettings: [
      {
        type: "buffer",
        params: {
          opacity: 1,
        },
      },
    ],
  },
  config: {},
};
const initialComponents: Array<ComponentUIDataT> = [
  exampleComponentUIData,
  {
    type: "file",
    props: {
      file: "https://files.rcsb.org/download/1FBL.pdb",
      fileSettings: { ext: "pdb" },
      viewSettings: [
        {
          type: "cartoon",
          params: {},
        },
      ],
    },
    config: {},
  },
];

const App = () => {
  const [toggle, setToggle] = React.useState(false);
  return (
    <React.StrictMode>
      <button onClick={() => setToggle((prev) => !prev)}>haha</button>
      <ProteinViewer>
        <div className="container1">
          <ViewerComponent />
          <div className="selector">
            {/* <ViewerSelector/> */}
            <ViewerStage width="100%" height="92vh" />
            <ViewerPanel />
          </div>
        </div>
        <FileComponent
          file="https://files.rcsb.org/download/1FBL.pdb"
          fileSettings={{ ext: "pdb" }}
          viewSettings={[
            {
              type: toggle ? "licorice" : "cartoon",
              params: {},
            },
          ]}
        />
        <NGLBox
          size={10}
          position={[10, 10, 10]}
          heightAxis={[0, 0, 10]}
          depthAxis={[0, 10, 0]}
          color={[toggle ? 0 : 100, 100, 100]}
          viewSettings={[
            {
              type: "buffer",
              params: {
                opacity: 1,
              },
            },
          ]}
        />
      </ProteinViewer>
    </React.StrictMode>
  );
};

export default App;
