import "./index.css";
import React from "react";
import ProteinViewer from "./ngl-viewer/user-interface/protein-viewer";
import FileComponent from "./ngl-viewer/file/file";
import ViewerStage from "./ngl-viewer/user-interface/viewer-stage";
import NGLBox from "./ngl-viewer/shapes/box";

const containerStyles = {
  width: "100%",
  height: "100%",
};

const stageSettings = {
  backgroundColor: "white",
};
const App = () => {
  const [toggle, setToggle] = React.useState(true);
  console.log(toggle)
  return (
    <React.StrictMode>
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
      <div
        style={{
          backgroundColor: "grey",
          height: `${window.innerHeight - 32}px`,
        }}
      >
        <ProteinViewer>
          <ViewerStage
            containerStyles={containerStyles}
            viewSettings={stageSettings}
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
          {toggle && (
            <NGLBox
              position={[1, 1, 1]}
              color={[255, 255, 0]}
              size={10}
              heightAxis={[0, 10, 0]}
              depthAxis={[10, 0, 0]}
              viewSettings={[
                {
                  type: "buffer",
                  params: {
                    opacity: 0.5,
                  },
                },
              ]}
            />
          )}
        </ProteinViewer>
      </div>
    </React.StrictMode>
  );
};

export default App;
