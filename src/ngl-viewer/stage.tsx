import React from 'react'
import * as NGL from 'ngl'

interface NGLStageProps extends React.PropsWithChildren{
  height        : string,
  width         : string,
  viewSettings? : NGL.StageParameters
}

interface NGLStageState{
  stage : NGL.Stage | null
}

export const StageContext  = React.createContext<NGLStageState>({
  stage : null
})

export default class NGLStage extends React.Component<
  NGLStageProps, NGLStageState
>{
  stageRef            : React.RefObject<HTMLDivElement>
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
    }
  }
  resizeStage = () => {
    this.state.stage?.handleResize()
  }
  componentWillUnmount(){
    this.state.stage?.dispose()
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
          className = 'ngl-viewer-stage' ref = {this.stageRef} style = {style}
          onResize = {this.resizeStage}
        />
      </div>
    )
  }
}