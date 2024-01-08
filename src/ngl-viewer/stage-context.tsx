import React from 'react'
import * as NGL from 'ngl'
const StageContext = React.createContext<{
  stage : NGL.Stage | null,
  version : number,
  setStage : (stage : NGL.Stage) => void,
  updateVersion : () => void,
}>({
  stage : null, setStage : () => {},
  version : 0,
  updateVersion : () => {},
})

export default StageContext