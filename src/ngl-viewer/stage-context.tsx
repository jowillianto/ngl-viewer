import React from 'react'
import * as NGL from 'ngl'
const StageContext = React.createContext<{
  stage : NGL.Stage | null
  setStage : (stage : NGL.Stage) => void
}>({
  stage : null, setStage : () => {}
})

export default StageContext