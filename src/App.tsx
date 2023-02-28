import React from "react";
import NGLFile from "./ngl-viewer/file/file";
import NGLStage from "./ngl-viewer/stage";

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
    return (
      <NGLStage 
        width = "100%" height = "900px"
      >
        <NGLFile 
          file          = {this.state.file}
          fileSettings  = {{ext : 'pdb'}}
          viewSettings  = {[{
            type : 'cartoon'
          }]}
        />
        <input type = 'file' onChange = {this.saveFile}/>
      </NGLStage>
    )
  }
}