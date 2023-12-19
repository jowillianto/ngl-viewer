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
        if(comp){
          let compChains = [] as [string, string][]
          comp.structure.eachChain((cp: any) => {
            let name = cp.chainname
            let val = `:${name}`
            compChains.push([cp.chainname, val])
          }, new NGL.Selection("polymer"))
          compChains.forEach((chain) => {
            comp.addRepresentation(
              "cartoon", {sele: chain[1]}
            )
            comp.addRepresentation("backbone", {
              visible: false,
              colorValue: new NGL.Color('lightgrey').getHex(),
              radiusScale: 2
            })
            comp.addRepresentation("spacefill", {
              sele: "( not polymer or not ( protein or nucleic ) ) and not ( water or ACE or NH2 )",
              visible: false
            })
            comp.addRepresentation("ball+stick", {
              sele: "none",
              aspectRatio: 1.1,
              colorValue: new NGL.Color('lightgrey').getHex(),
              multipleBond: "symmetric"
            })
            comp.addRepresentation("ball+stick", {
              multipleBond: "symmetric",
              colorValue: new NGL.Color('grey').getHex(),
              sele: "none",
              aspectRatio: 1.2,
              radiusScale: 2.5
            })
            comp.addRepresentation("contact", {
              sele: "none",
              radiusSize: 0.07,
              weakHydrogenBond: false,
              waterHydrogenBond: false,
              backboneHydrogenBond: true
            })
            comp.addRepresentation("surface", {
              sele: "none",
              lazy: true,
              visibility: true,
              clipNear: 0,
              opaqueBack: false,
              opacity: 0.0,
              color: "hydrophobicity",
              roughness: 1.0,
              surfaceType: "av"
            })
            comp.addRepresentation("label", {
              sele: "none",
              color: "#333333",
              yOffset: 0.2,
              zOffset: 2.0,
              attachment: "bottom-center",
              showBorder: true,
              borderColor: new NGL.Color('lightgrey').getHex(),
              borderWidth: 0.25,
              disablePicking: true,
              radiusType: "size",
              radiusSize: 0.8,
              labelType: "residue",
              labelGrouping: "residue"
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
          this.context.updateVersion()
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
  componentDidUpdate(prevProps: NGLFileProps, prevState: NGLFileState): void {
    if(prevProps.chains !== this.props.chains){
      this.loadFileToStage()
    }
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