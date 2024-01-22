import * as NGL from 'ngl'
import { ShapeParameters } from 'ngl/dist/declarations/geometry/shape'
import React from 'react'
import { ViewSettings } from '../interfaces/interfaces'
import StageContext from '../stage-context'

export type BasicShapeProps<T = {}> = {
  viewSettings  : ViewSettings, 
  shapeParams?  : Partial<ShapeParameters>
} & T

export type ExtendedShapeProps<T = {}> = BasicShapeProps<{name? : string} & T>

export type BaseShapeProps = BasicShapeProps<{
  addShape      : (shape : NGL.Shape) => NGL.Shape
  hash          : any
}>

export type BaseShapeState = {
  component   : NGL.Component | null
}

export default class BaseShape extends React.Component<
  BaseShapeProps, BaseShapeState
>{  
  static contextType  = StageContext
  context !: React.ContextType<typeof StageContext>
  constructor(props : BaseShapeProps){
    super(props)
    this.state  = {
      component   : null
    }
  }
  componentDidMount(): void {
    this.addShapeFromProps()
  }
  componentDidUpdate(prevProps : BaseShapeProps, prevState : BaseShapeState){
    if(this.props.hash !== prevProps.hash){
      this.addShapeFromProps()
    }
  }
  shouldComponentUpdate(
    nextProps: Readonly<BaseShapeProps>,
    nextState: Readonly<BaseShapeState>, 
    nextContext: React.ContextType<typeof StageContext>
  ): boolean {
    const sameStage   = nextContext.stage === this.context.stage
    const sameHash    = nextProps.hash === this.props.hash
    return !(sameHash && sameStage)
  }
  addShapeFromProps(){
    this.removeComponentIfExist()
    const shapeParams = this.props.shapeParams
    const shape       = new NGL.Shape("shape", shapeParams)
    const modShape    = this.props.addShape(shape)
    const stage       = this.context.stage
    if(stage){
      const component   = stage.addComponentFromObject(modShape)
      if(component){
        const viewSettings  = this.props.viewSettings
        viewSettings.forEach((viewSetting) => {
          component.addRepresentation(viewSetting.type, viewSetting.params)
        })
        stage.autoView()
        this.context.updateVersion()
        this.setState({component : component})
      }
    }
  }
  removeComponentIfExist(){
    if(this.state.component) 
      this.context.stage?.removeComponent(this.state.component)
  }
  removeShape(){
    const stage       = this.context.stage
    const component   = this.state.component
    if(stage && component)
      stage.removeComponent(component)
  }
  componentWillUnmount(): void {
    this.removeComponentIfExist()
  }
  render(): React.ReactNode {
    return <></>
  }
}