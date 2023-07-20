import React from 'react'
import * as NGL from 'ngl'
import { StageContext } from '../photoshop/stage'
import { StageLoadFileParams } from 'ngl/dist/declarations/stage/stage'
import { ViewSettings } from '../interfaces/interfaces'
import StructureComponentContext from 'ngl-viewer/context/component-context'

export interface NGLFileProps extends React.PropsWithChildren{
  file          : Blob | string | null,
  viewSettings  : ViewSettings
  fileSettings? : Partial<StageLoadFileParams>
  controls?     : Object
}
export interface NGLFileState{
  showRepr      : boolean,
  component     : NGL.StructureComponent | null,
  update        : boolean
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
      component : null, 
      update    : false
    }
  }
  loadFileToStage(){
    const stage     = this.context.stage
    const file      = this.props.file
    if(stage && file && !this.state.update){
      this.removeComponentIfExist()
      stage.loadFile(file, this.props.fileSettings)
      .then((component) => {
        const viewSettings  = this.props.viewSettings
        if(component){
          viewSettings.forEach((viewSetting) => {
            component.addRepresentation(
              viewSetting.type, viewSetting.params
            )
          })
          stage.autoView()
          this.setState({
            component : component as NGL.StructureComponent, update : true
          }, () => this.setState({update : false}))
        }
      })
      .catch((err) => {
        console.error(err)
      })
    }
  }
  compareState(nextState : Readonly<NGLFileState>) : boolean{
    return nextState.update
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
    const diffFile    = this.props.file !== nextProps.file
    const diffSettings= this.props.viewSettings !== nextProps.viewSettings
    const diffStage   = this.context.stage !== nextContext.stage
    const diffState   = this.compareState(nextState)
    return diffFile || diffSettings || diffStage || diffState
  }
  componentDidUpdate(): void {
    this.loadFileToStage()
  }
  componentWillUnmount(): void {
    this.removeComponentIfExist()
  }
  render(): React.ReactNode {
    return (
      <StructureComponentContext.Provider value = {this.state}>
        <div className = 'file-controls'>
          {this.props.children}
        </div>
      </StructureComponentContext.Provider>
    )
  }
}