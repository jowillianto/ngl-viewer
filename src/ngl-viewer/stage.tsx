import React from 'react'
import * as NGL from 'ngl'
import StageContext from './stage-context'

export type NGLStageProps = React.PropsWithChildren<{
  height        : string,
  width         : string,
  viewSettings? : ConstructorParameters<typeof NGL.Stage>[1],
}>

export type NGLStageState = {
  stage : NGL.Stage | null
}

export default class NGLStage extends React.Component<
  NGLStageProps, NGLStageState
>{
  static contextType = StageContext
  context !: React.ContextType<typeof StageContext>
  stageRef : React.RefObject<HTMLDivElement>
  observer : ResizeObserver | undefined
  constructor(props : NGLStageProps){
    super(props)
    this.stageRef = React.createRef()
  }
  componentDidMount(){
    const htmlElm = this.stageRef.current
    if(htmlElm){
      const stage = new NGL.Stage(
        htmlElm, this.props.viewSettings
      )
      this.context.setStage(stage)
      this.addObserver()
    }
  }
  addObserver(){
    if(this.stageRef.current){
      this.observer   = new ResizeObserver(this.resizeStage)
      this.observer.observe(this.stageRef.current)
    }
  }
  resizeStage = () => {
    this.context.stage?.handleResize()
  }
  componentWillUnmount(){
    this.context.stage?.dispose()
    this.observer?.disconnect()
  }
  render(): React.ReactNode {
    const height  = this.props.height
    const width   = this.props.width
    const style   = {height : height, width : width}
    return(
      <div className = 'ngl-viewer-stage'>
        <div className = 'ngl-viewer-tab'>
          {this.props.children}
        </div>
        <div 
          className = 'ngl-viewer-canvas' ref = {this.stageRef} style = {style}
        />
      </div>
    )
  }
}