import "./index.css";
import React from "react";
import ProteinViewer from "./ngl-viewer/user-interface/protein-viewer";
import FileComponent from "./ngl-viewer/file/file";
import ViewerStage from "./ngl-viewer/user-interface/viewer-stage";
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
      file: "https://files.rcsb.org/download/2ZLF.pdb",
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
      <div style={{ backgroundColor: "grey" }}>
        <ProteinViewer>
          <button onClick={() => setToggle((prev) => !prev)}>haha</button>
          <div className="container1">
            <ViewerComponent />
            <div className="selector">
              {/* <ViewerSelector/> */}
              <ViewerStage
                containerStyles={{
                  width: "100%",
                  height: "500px",
                }}
                viewSettings={{ backgroundColor: toggle ? "black" : "white" }}
              />
              {/* <ViewerPanel /> */}
            </div>
          </div>
          <FileComponent
            file="https://files.rcsb.org/download/2ZLF.pdb"
            fileSettings={{ ext: "pdb" }}
            viewSettings={[
              {
                type: "cartoon",
                params: {},
              },
            ]}
            chains={["A"]}
          />
          <NGLBox
            position={[1, 1, 1]}
            color={[1, 1, 0]}
            size={10}
            heightAxis={[0, 10, 0]}
            depthAxis={[10, 0, 0]}
            viewSettings={[
              {
                type: "buffer",
                params: {
                  opacity: 0.8,
                },
              },
            ]}
          />
        </ProteinViewer>
      </div>
    </React.StrictMode>
  );
};

export default App;
