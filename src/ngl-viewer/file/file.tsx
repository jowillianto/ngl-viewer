import React from 'react'
import * as NGL from 'ngl'
import StageContext from '../stage-context'
import { StageLoadFileParams } from 'ngl/dist/declarations/stage/stage'
import { ViewSettings } from '../interfaces/interfaces'
import StructureComponentContext from '../context/component-context'

export type NGLFileProps = React.PropsWithChildren & {
  file          : Blob | string | null,
  viewSettings  : ViewSettings
  fileSettings? : Partial<StageLoadFileParams>
  controls?     : Object
  chains?        : string[]
}
export type  NGLFileState = {
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
      .then((component: NGL.Component | void) => {
        const comp = component as NGL.StructureComponent
        const viewSettings  = this.props.viewSettings
        if(comp){
          let compChains = [] as [string, string][]
          comp.structure.eachChain((cp: any) => {
            let name = cp.chainname
            let val = `:${name}`
            compChains.push([cp.chainname, val])
          }, new NGL.Selection("polymer"))
          viewSettings.forEach((viewSetting) => {
            compChains.forEach((chain) => {
              comp.addRepresentation(
                "cartoon", {...viewSetting.params, sele: chain[1]}
              )
            })
          })
          if(this.props.chains){
            comp.eachRepresentation((repr) => {
              if (!this.props.chains?.includes((repr.parameters as any).sele.slice(1))) {
                repr.setVisibility(false);
              }
            }); 
          }
          stage.autoView()
          this.setState({
            component : component as NGL.StructureComponent, update : true
          }, () => this.setState({update : false}))
        }
      })
      .catch((err:any) => {
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