import React from 'react'
import * as NGL from 'ngl'

export type NGLStageProps = React.PropsWithChildren<{
  height        : string,
  width         : string,
  viewSettings? : ConstructorParameters<typeof NGL.Stage>[1],
}>


export type NGLStageState = {
  stage: NGL.Stage | null;
  isSpinning: boolean; // New state
  isRocking: boolean;  // New state
  projectionType: 'perspective' | 'orthographic' | 'stereo'; 

}

// Modify your existing StageContext
export const StageContext = React.createContext<NGLStageState & {
  toggleSpin?: () => void;  
  toggleRock?: () => void;  
  setPerspective?: () => void;  
  setOrthographic?: () => void;  
  setStereo?: () => void; 
  centerStructure?: () => void; 
  toggleFullScreen?: () => void; 
}>({
  stage: null,
  isSpinning: false,
  isRocking: false,
  projectionType: 'perspective'  // <-- Default value
});




export default class NGLStage extends React.Component<
  NGLStageProps, NGLStageState
>{
  stageRef            : React.RefObject<HTMLDivElement>
  observer            : ResizeObserver | undefined
  constructor(props: NGLStageProps) {
    super(props);
    this.state = {
      stage: null,
      isSpinning: false,
      isRocking: false,
      projectionType: 'perspective'  // <-- Default value
    };
    this.stageRef = React.createRef();
}

  // Inside NGLStage class
  centerStructure = () => {
    if (this.state.stage) {
        this.state.stage.autoView();
    }
}
toggleFullScreen = () => {
  const currentElement = this.stageRef.current;

  if (currentElement) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      currentElement.requestFullscreen();
    }
  }
}
  toggleSpin = () => {
    if (this.state.stage) {
      const isSpinning = !this.state.isSpinning;
      this.state.stage.setSpin(isSpinning);
      this.setState({ isSpinning });
    }
}

toggleRock = () => {
    if (this.state.stage) {
      const isRocking = !this.state.isRocking;
      this.state.stage.setRock(isRocking);
      this.setState({ isRocking });
    }
}
setPerspective = () => {
  this.state.stage?.setParameters({ cameraType: 'perspective' });
  this.setState({ projectionType: 'perspective' });
}

setOrthographic = () => {
  this.state.stage?.setParameters({ cameraType: 'orthographic' });
  this.setState({ projectionType: 'orthographic' });
}

setStereo = () => {
  this.state.stage?.setParameters({ cameraType: 'stereo' });
  this.setState({ projectionType: 'stereo' });
}
  componentDidUpdate(prevProps: NGLStageProps) {
    if (this.state.stage && prevProps.viewSettings?.backgroundColor !== this.props.viewSettings?.backgroundColor) {
      this.state.stage.setParameters({
        backgroundColor: this.props.viewSettings?.backgroundColor
      });
    }
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
       <StageContext.Provider value={{
            ...this.state, 
            toggleSpin: this.toggleSpin, 
            toggleRock: this.toggleRock, 
            setPerspective: this.setPerspective, 
            setOrthographic: this.setOrthographic, 
            setStereo: this.setStereo,  
            centerStructure: this.centerStructure,
            toggleFullScreen: this.toggleFullScreen  // <-- Add this line
          }}>

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