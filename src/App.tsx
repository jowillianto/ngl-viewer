import React from "react";
import NGLFile from "./ngl-viewer/file/file";
import NGLStage from "./ngl-viewer/photoshop/stage";
import MyContextProvider from "ngl-viewer/photoshop/photoshop";
import "./index.css"

export default class App extends React.Component<any, any>{
  constructor(props : any){
    super(props)
    this.state  = {
      components : []
    }
  }
  addComponent = (e : React.ChangeEvent<HTMLInputElement>) => {
    const components  = this.state.components.slice()
    if (e.target.files){
      components.push(e.target.files[0])
      this.setState({ components })
    }
  }
  renderFile = () => {
    return (this.state.components as Array<File>)
    .map((file) => (
      <React.Fragment>
        <NGLFile 
        file          = {file}
        fileSettings  = {{ext : 'pdb'}}
        viewSettings  = {[{type : 'cartoon'}]}
      />
      </React.Fragment>
    )
  )
  }
  renderUploaded = () => {
    return (this.state.components as Array<File>)
    .map((file, id) => 
      <div className = 'uploaded-entry'>
        <p>Name : {file.name}</p>
        <button onClick = {() => this.removeFile(id)}>
          Remove
        </button>
      </div>
    )
  }
  removeFile = (id : number) => {
    const components  = this.state.components.slice()
    components.splice(id, 1)
    this.setState({ components })
  }
  render(): React.ReactNode {
    return (

      <MyContextProvider>
        <NGLStage 
          width = "80vw" height = "900px">
          {this.renderFile()}
            <div className = 'uploaded-cont'>
              {this.renderUploaded()}
            </div>
            <div className = 'add-new-cont'>
              <input 
                type = 'file'
                onChange = {this.addComponent}/>
            </div>
        </NGLStage>
      </MyContextProvider>
    

    )
  }
}




