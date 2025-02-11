# NGL Viewer for React
The following package allows the developer to use already built in components to embed NGL Viewer in React.JS in the easiest way possible. 
Currently, the best ways to use this is by passing the correct props. 
## Installing
To install this components library, use the following command with `npm`
```
npm install git+https://github.com/jowillianto/ngl-viewer#stable
```
## Usage
A very simple example of using is : 
```tsx
import React from 'react'
import ProteinViewer, {ProteinStage} from "@jowillianto/ngl-viewer/dist"
import { 
  ComponentUIDataT 
} from "@jowillianto/ngl-viewer/dist/ngl-viewer/user-interface/component-data";

const App = () => {
  const component : ComponentUIDataT = {
    type : "file",
    props : {
      file : "http://files.rcsb.org/download/7RDR.pdb",
      fileSettings : {},
      viewSettings : [{
        type : 'cartoon', params : {}
      }]
    },
    config : {}
  }
  return (
    <ProteinViewer initialComponents = {[component]}>
      <ViewerStage containerStyles = {{ width : "800px", height: "800px" }} />
    </ProteinViewer>
  )
}

export default App
```
## Commonly Used APIs
### 1. ProteinViewer
ProteinViewer is a component that has to be written first as to allow its child component to function in the correct manner.
```ts
type ProteinViewerProps = {
  initialComponents : ComponentUIDataT[]
}
```
Note that `initialComponents` will only be read once when the component is rendered. Any changes applied to this variable will not be read by the ProteinViewer. 
### 2. ViewerStage
ViewerStage renders the NGL Stage with corresponding height and width. 
```ts
type ViewerStageProps = {
  height : string, width : string
}
```
### 3. ViewerPanel
ViewerPanel is a built in panel that allows the modification of components that has been added to the stage. 
```ts
  type ViewerPanelProps = {}
```
### 4. ViewerSelector
ViewerSelector is a built in selector based on `react-select` that renders a selector that allows addition of objects to the stage. 
```ts
  type ViewerSelectorProps = {
    options : OptionT
  }
  // Available Options
  type OptionT = 
    | "text" | "arrow" 
    | "box" | "cone" 
    | "ellipsoid" | "torus" 
    | "sphere" | "cylinder" 
    | "tetrahedron" | "octahedron" 
    | "file"
```
