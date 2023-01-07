import React from "react";
import NGLFile from "./ngl-viewer/file/file";
import NGLArrow from "./ngl-viewer/shapes/arrow";
import NGLBox from "./ngl-viewer/shapes/box";
import NGLSphere from "./ngl-viewer/shapes/sphere";
import NGLStage from "./ngl-viewer/stage";
import NGLScreenshot from "./ngl-viewer/utils/screenshot";

interface ScreenshotButtonProps{
  onChange  : (img : string) => void
  onClick?  : () => Promise<Blob>
}

class ScreenshotButton extends React.Component<
  ScreenshotButtonProps
>{
  onClick = () => {
    if(this.props.onClick)
      this.props.onClick()
      .then((img) => {
        const blob  = img
        const url   = URL.createObjectURL(blob)
        this.props.onChange(url)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  render(): React.ReactNode {
    return(
      <button onClick = {this.onClick}>
        Screenshot
      </button>
    )
  }
}

export default class App extends React.Component<
  any, any
>{
  constructor(props : any){
    super(props)
    this.state  = {
      file    : null,
      radius  : 10, 
      img     : ''
    }
  }
  saveFile = (event : React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files)
      this.setState({
        file : event.target.files[0]
      })
  }
  saveImage = (img : string) => {
    this.setState({img : img})
  }
  render(): React.ReactNode {
    const defaultSettings   = [{
      type : "buffer", 
      params : {opacity : 0.7}
    }]
    return (
      <NGLStage 
        width = "100%" height = "900px"
      >
        <NGLFile 
          file          = {this.state.file}
          fileSettings  = {{
            ext : 'pdb'
          }}
          viewSettings  = {[{
            type : 'cartoon'
          }]}
        />
        <NGLSphere 
          radius        = {this.state.radius}
          position      = {[0, 0, 0]}
          viewSettings  = {defaultSettings}
          color         = {[255, 255, 255]}
        />
        <NGLBox 
          position      = {[10, 10, 10]}
          color         = {[200, 100, 150]}
          size          = {this.state.radius}
          heightAxis    = {[this.state.radius, 0, 0]}
          depthAxis     = {[0, this.state.radius, 0]}
          viewSettings  = {defaultSettings}
        />
        <NGLArrow 
          position1     = {[0, 0, 0]}
          position2     = {[0, 0, 20]}
          color         = {[100, 0, 0]}
          radius        = {this.state.radius * 0.1}
          viewSettings  = {defaultSettings}
        />
        <NGLScreenshot 
          render = {
            <ScreenshotButton 
              onChange = {this.saveImage}
            />
          }
        />
        <input type = 'file' onChange = {this.saveFile}/>
        <input 
          type = 'number' 
          onChange = {
            (event) => this.setState({radius : parseFloat(event.target.value)})
          } 
          value = {this.state.radius}
        />
        <img 
          src = {this.state.img}
        />
      </NGLStage>
    )
  }
}