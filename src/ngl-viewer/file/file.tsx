import React from 'react'
import * as NGL from 'ngl'
import StageContext from '../stage-context'
import { StageLoadFileParams } from 'ngl/dist/declarations/stage/stage'
import { ViewSettings } from '../interfaces/interfaces'
import StructureComponentContext from '../context/component-context'

export type NGLFileProps = React.PropsWithChildren & {
  file          : File | string | null,
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
      const fileExtension = file instanceof File ? file.name.split('.').pop() : ''
      this.removeComponentIfExist()
      stage.loadFile(file, this.props.fileSettings)
      .then((component: NGL.Component | void) => {
        const comp = component as NGL.StructureComponent
        if(comp){
          if(fileExtension === 'pdb'){
            // let compChains = [] as [string, string][]
            // comp.structure.eachChain((cp: any) => {
            //   le`t name = cp.chainname
            //   let val = `:${name}`
            //   compChains.push([cp.chainname, val])
            // }, new NGL.Selection("polymer"))
            comp.addRepresentation("cartoon", {
              visible: false,
              colorScheme: "atomindex",
            })
            comp.addRepresentation("backbone", {
              visible: false,
              colorScheme: "atomindex",
              radiusScale: 1.2
            })
            comp.addRepresentation("spacefill", {
              visible: false,
              colorScheme: "atomindex",
            })
            comp.addRepresentation("licorice", {
              visible: false,
              colorScheme: "atomindex",
              radiusScale: 1
            })
            comp.addRepresentation("line", {
              visible: false,
              colorScheme: "atomindex",
              multipleBond: "symmetric",
            })
            comp.addRepresentation("ball+stick", {
              visible: true,
              colorScheme: "atomindex",
              multipleBond: "symmetric",
            })
            comp.addRepresentation("surface", {
              colorScheme: "electrostatic",
              sele : 'polymer', 
              opacity : 0.5,
              colorDomain : [-80, 80], 
              surfaceType : 'av',
              visible : false
            })
            comp.addRepresentation("contact", {
              radiusSize: 0.07,
              weakHydrogenBond: false,
              waterHydrogenBond: false,
              backboneHydrogenBond: false,
              hydrogenBond: false,
              ionicInteraction: false,
              metalCoordination: false,
              piStacking: false,
              cationPi: false,
              weakHalogenBond: false,
            })
            if(this.props.chains){
              comp.eachRepresentation((repr) => {
                if (!this.props.chains?.includes((repr.parameters as any).sele.slice(1))) {
                  repr.setVisibility(false);
                }
              }); 
            }
          }
          else if(fileExtension === 'pdbqt'){
            comp.addRepresentation("ball+stick", {
              multipleBond: "symmetric",
              colorValue: new NGL.Color('grey').getHex(),
              sele: "(not polymer or not (protein or nucleic)) and chain L",
              radiusScale: 1.3,
              visible: true
            })
            comp.addRepresentation("contact", {
              contactType: "residue",
              atomRadius: 5,
              scale: 1,
              masterModel: 0,
              sele: "(not polymer or not (protein or nucleic)) and chain L",
              radiusSize: 0.07,
              weakHydrogenBond: false,
              waterHydrogenBond: false,
              backboneHydrogenBond: false,
              hydrogenBond: false,
              ionicInteraction: false,
              metalCoordination: false,
              piStacking: false,
              cationPi: false,
              weakHalogenBond: false,
            })
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