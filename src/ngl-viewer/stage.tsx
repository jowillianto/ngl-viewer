import React from 'react'
import * as NGL from 'ngl'

export type NGLStageProps = React.PropsWithChildren<{
  height        : string,
  width         : string,
  viewSettings? : NGL.StageParameters,
}>

export type NGLStageState = {
  stage : NGL.Stage | null
}

export const StageContext  = React.createContext<NGLStageState>({
  stage : null
})

export default class NGLStage extends React.Component<
  NGLStageProps, NGLStageState
>{
  stageRef            : React.RefObject<HTMLDivElement>
  observer            : ResizeObserver | undefined
  constructor(props : NGLStageProps){
    super(props)
    this.state  = {
      stage : null
    }
    this.stageRef   = React.createRef()
  }
  componentDidMount(){
    const htmlElm = this.stageRef.current
    if(htmlElm){
      const stage   = new NGL.Stage(
        htmlElm, this.props.viewSettings
      )
      this.setState({stage : stage})
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
    this.state.stage?.handleResize()
  }
  componentWillUnmount(){
    this.state.stage?.dispose()
    this.observer?.disconnect()
  }
  render(): React.ReactNode {
    const height  = this.props.height
    const width   = this.props.width
    const style   = {height : height, width : width}
    return(
      <div className = 'ngl-viewer-stage'>
        <StageContext.Provider value = {this.state}>
          <div className = 'ngl-viewer-tab'>
            {this.props.children}
          </div>
        </StageContext.Provider>
        <div 
          className = 'ngl-viewer-canvas' ref = {this.stageRef} style = {style}
        />
      </div>
    )
  }
}