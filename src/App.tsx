import React from "react"
import "./index.css"
import ProteinViewer from "./ngl-viewer/user-interface/protein-viewer"
import ViewerSelector from "./ngl-viewer/user-interface/component-selector"
import ViewerStage from "./ngl-viewer/user-interface/viewer-stage"
import ViewerPanel from "./ngl-viewer/user-interface/viewer-panel"

const App = () => {
  return (
    <ProteinViewer>
      <div className = 'container'>
        <div className = 'viewer'>
          <ViewerStage height = "80vh" width = "80vw" />
        </div>
        <div className = 'selector'>
<<<<<<< HEAD
          <ViewerSelector />
=======
          <ViewerSelector options = {["box", "arrow"]}/>
>>>>>>> 7e6b4a9498d1f66147cd42a51bb9e666709b02f4
          <ViewerPanel />
        </div>
      </div>
    </ProteinViewer>
  )
}

export default App
