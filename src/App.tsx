import "./index.css"
import ProteinViewer from "./ngl-viewer/user-interface/protein-viewer"
import ViewerSelector from "./ngl-viewer/user-interface/component-selector"
import ViewerStage from "./ngl-viewer/user-interface/viewer-stage"
import ViewerPanel from "./ngl-viewer/user-interface/viewer-panel"
import ViewerComponent from "./viewer-component"
import { ComponentUIDataT } from "./ngl-viewer/user-interface/component-data"
const App = () => {
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
        }
      ],
    },
    config: {},
  };
  const initialComponents: Array<ComponentUIDataT> = [
    exampleComponentUIData
  ];
  return ( 
    <ProteinViewer>
      <div className='container1'>
        <ViewerComponent />
        <div className='selector'>
          {/* <ViewerSelector/> */}
          <ViewerStage width="70vw" height = "92vh"/>
          <ViewerPanel />
        </div>
      </div>
    </ProteinViewer>
  )
}

export default App;
