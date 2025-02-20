import "./index.css";
import React from "react";
import ProteinViewer from "./ngl-viewer/user-interface/protein-viewer";
import FileComponent from "./ngl-viewer/file/file";
import ViewerStage from "./ngl-viewer/user-interface/viewer-stage";
import NGLBox from "./ngl-viewer/shapes/box";
const App = () => {
  const [toggle, setToggle] = React.useState(false);
  return (
    <React.StrictMode>
      <div style={{ backgroundColor: "grey", height: "100vh" }}>
        <ProteinViewer>
          <ViewerStage
            containerStyles={{
              width: "100%",
              height: "100%",
            }}
            viewSettings={{ backgroundColor: toggle ? "black" : "white" }}
          />
          {/* <ViewerPanel /> */}
          <FileComponent
            file="https://files.rcsb.org/download/2ZLF.pdb"
            fileSettings={{ ext: "pdb" }}
            viewSettings={[
              {
                type: "ball+stick",
                params: {
                  color: "element",
                  radius: "0.1",
                },
              },
            ]}
            chains={["A"]}
          />
          <NGLBox
            position={[1, 1, 1]}
            color={[255, 255, 0]}
            size={1}
            heightAxis={[0, 1, 0]}
            depthAxis={[1, 0, 0]}
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
      </div>
    </React.StrictMode>
  );
};

export default App;
