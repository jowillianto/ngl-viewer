import React, { useState } from "react";
import NGLFile from "./ngl-viewer/file/file";
import PhotoshopStage from "ngl-viewer/photoshop/photoshopRender";
import "./index.css"
import Photoshop from "ngl-viewer/photoshop/photoshop";
import PhotoshopSelector from "ngl-viewer/photoshop/photoshopSelector";

const App = () => {
  const [components, setComponents] = useState<File[]>([]);

  const addComponent = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0){
      const file = e.target.files[0];
      if(file){
        setComponents(prevComponents => [...prevComponents, file]);
      }
    }
  }

  const renderFile = () => {
    return components.map((file) => (
      <React.Fragment>
        <NGLFile 
          file          = {file}
          fileSettings  = {{ext : 'pdb'}}
          viewSettings  = {[{type : 'cartoon'}]}
        />
      </React.Fragment>
    ))
  }

  const renderUploaded = () => {
    return components.map((file, id) => 
      <div className='uploaded-entry'>
        <p>Name : {file.name}</p>
        <button onClick={() => removeFile(id)}>
          Remove
        </button>
      </div>
    )
  }

  const removeFile = (id: number) => {
    setComponents(prevComponents => prevComponents.filter((_, index) => index !== id));
  }

  return (
    <Photoshop>
      <PhotoshopSelector options={["sphere"]}/>
      <PhotoshopStage/>
    </Photoshop>
  );
}

export default App;
