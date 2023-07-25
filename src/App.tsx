import "./index.css";
import Photoshop from "ngl-viewer/photoshop/photoshop";
import RenderShapes from "ngl-viewer/photoshop/renderShape";


const App = () => {

  return (
    <Photoshop>
      <RenderShapes 
        width = "1100px"
        height = "85vh"
      />
  </Photoshop>
  );
};

export default App;
