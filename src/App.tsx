import "./index.css"
import ProteinViewer from "./ngl-viewer/user-interface/protein-viewer"
import ViewerSelector from "./ngl-viewer/user-interface/component-selector"
import ViewerStage from "./ngl-viewer/user-interface/viewer-stage"
import ViewerPanel from "./ngl-viewer/user-interface/viewer-panel"
import ViewerComponent from "./viewer-component"
const App = () => {
  
  return ( 
    
        <ProteinViewer>
          <div className='container1'>
            <ViewerComponent />
            <div className='selector'>
              {/* <ViewerSelector/> */}
              <ViewerStage width="80vw" height = "92vh"/>
              <ViewerPanel />
            </div>
          </div>
        </ProteinViewer>
    
  )
}

export default App;
