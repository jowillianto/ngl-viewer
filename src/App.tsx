import "./index.css";
import Photoshop from "ngl-viewer/photoshop/photoshop";
import { PhotoshopPanel } from "ngl-viewer/photoshop/photoshopPanel";
import { mockComponentsDataMap } from "ngl-viewer/photoshop/componentData";
import { PhotoshopSelector } from "ngl-viewer/photoshop/photoshopSelector";
import PhotoshopStage from "ngl-viewer/photoshop/renderShape";
import FileRenderer from "ngl-viewer/forms/file-renderer";
import PDBViewer from "ngl-viewer/forms/file-renderer";

const App = () => {

  return (
    <Photoshop>
      <div style = {{display : 'flex'}}>
        <PhotoshopStage width = "60vw" height = "80vh" />
        <div style = {{display : 'flex', flexFlow : 'column wrap'}}>
          <PhotoshopSelector 
            options = {Object.keys(mockComponentsDataMap) as any}
          />
          <PhotoshopPanel />
        </div>
      </div>
    </Photoshop>
  );
};

export default App;
