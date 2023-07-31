import React from "react"
import "./index.css"
import ProteinViewer from "ngl-viewer/user-interface/protein-viewer"
import ViewerSelector from "ngl-viewer/user-interface/component-selector"
import ViewerStage from "ngl-viewer/user-interface/viewer-stage"
import ViewerPanel from "ngl-viewer/user-interface/viewer-panel"

const App = () => {
  return (
    <ProteinViewer>
      <div className = 'container'>
        <div className = 'viewer'>
          <ViewerStage height = "80vh" width = "80vw" />
        </div>
        <div className = 'selector'>
          <ViewerSelector />
          <ViewerPanel />
        </div>
      </div>
    </ProteinViewer>
  )
}

export default App
