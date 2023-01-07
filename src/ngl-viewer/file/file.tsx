import React from 'react'
import * as NGL from 'ngl'
import { StageContext } from '../stage'
import { StageLoadFileParams } from 'ngl/dist/declarations/stage/stage'
import { ViewSettings } from '../interfaces/interfaces'

interface NGLFileProps{
  file          : Blob | string | null,
  viewSettings  : ViewSettings
  fileSettings? : Partial<StageLoadFileParams>
  controls?     : Object
}
interface NGLFileState{
  showRepr      : boolean,
  component     : NGL.Component | null
}

export default class NGLFile extends React.Component<
  NGLFileProps, NGLFileState
>{
  static contextType  = StageContext
  context !: React.ContextType<typeof StageContext>
  constructor(props : NGLFileProps){
    super(props)
    this.state  = {
      showRepr  : true,
      component : null
    }
  }
  loadFileToStage(){
    const stage     = this.context.stage
    const file      = this.props.file
    this.removeComponentIfExist()
    if(stage && file){
      stage.loadFile(file, this.props.fileSettings)
      .then((component) => {
        const viewSettings  = this.props.viewSettings
        if(component){
          viewSettings.forEach((viewSetting) => {
            component.addRepresentation(
              viewSetting.type, viewSetting.params
            )
          })
          component.autoView()
          this.setState({component : component})
        }
      })
      .catch((err) => {
        console.error(err)
      })
    }
  }
  compareState(nextState : Readonly<NGLFileState>) : boolean{
    const sameRepr  = nextState.showRepr === this.state.showRepr
    const component = nextState.component === this.state.component
    return !(sameRepr && component)
  }
  removeComponentIfExist(){
    const stage     = this.context.stage
    const component = this.state.component
    if(stage && component) stage.removeComponent(component)
  }
  componentDidMount(): void {
    this.loadFileToStage()
  }
  shouldComponentUpdate(
    nextProps: Readonly<NGLFileProps>, 
    nextState: Readonly<NGLFileState>, 
    nextContext: React.ContextType<typeof StageContext>
  ): boolean {
    // Make Update Conditions here
    const sameFile    = this.props.file === nextProps.file
    const sameSettings= this.props.viewSettings === nextProps.viewSettings
    const sameStage   = this.context.stage === nextContext.stage
    const sameState   = this.compareState(nextState)
    return !(sameFile && sameSettings && sameStage && sameState)
  }
  componentDidUpdate(): void {
    this.loadFileToStage()
  }
  componentWillUnmount(): void {
    this.removeComponentIfExist()
  }
  render(): React.ReactNode {
    return (
      <div className = 'file-controls'>

      </div>
    )
  }
}