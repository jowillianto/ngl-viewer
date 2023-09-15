import React from "react"
import "./index.css"
import ProteinViewer from "./ngl-viewer/user-interface/protein-viewer"
import ViewerSelector from "./ngl-viewer/user-interface/component-selector"
import ViewerStage from "./ngl-viewer/user-interface/viewer-stage"
import ViewerPanel from "./ngl-viewer/user-interface/viewer-panel"
import NGLScreenshot from "./ngl-viewer/utils/screenshot"
import { useState } from 'react';
import ScreenshotAndDownload from "./ngl-viewer/user-interface/screenshot-download"

const App = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const imageParameters = {
    trim: true,
    factor: 1,
    antialias: true,
    transparent: true,
    onProgress: undefined
  };
  return (
    <ProteinViewer>
       <header>
        <div className="file-header">
          {/* File */}
          {/* <button onClick={() => setShowDropdown(!showDropdown)}>▼</button>
          {showDropdown && (
            <ul className="dropdown">
              <li>
                <ScreenshotAndDownload 
                  render = {(props : any) => <button {...props}>Screenshot</button>}
                  props = {{}}
                />
              </li>
            </ul>
          )} */}
        </div>
      </header>
      <div className='container'>
        <div className='viewer'>
          <ViewerStage height="80vh" width="80vw">
          <div className="file-header">
            File
            <button onClick={() => setShowDropdown(!showDropdown)}>▼</button>
            {showDropdown && (
              <ul className="dropdown">
                <li>
                  <ScreenshotAndDownload 
                    render = {(props : any) => <button {...props}>Screenshot</button>}
                    props = {{}}
                  />
                </li>
              </ul>
            )}
          </div>
          </ViewerStage>
        </div>
        <div className='selector'>
          <ViewerSelector/>
          <ViewerPanel />
        </div>
      </div>
    </ProteinViewer>
  )
}

export default App