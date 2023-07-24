import React from "react";
import NGLArrow from "ngl-viewer/shapes/arrow";
import NGLBox from "ngl-viewer/shapes/box";
import NGLCone from "ngl-viewer/shapes/cone";
import NGLEllipsoid from "ngl-viewer/shapes/ellipsoid";
import NGLOctahedron from "ngl-viewer/shapes/octahedron";
import NGLSphere from "ngl-viewer/shapes/sphere";
import NGLTetrahedron from "ngl-viewer/shapes/tetrahedron";
import NGLText from "ngl-viewer/shapes/text";
import NGLCylinder from "ngl-viewer/shapes/cylinder";
import NGLTorus from "ngl-viewer/shapes/torus";
import { ComponentDataT } from "ngl-viewer/photoshop/componentData";
import NGLFile from "ngl-viewer/file/file";

const ComponentSwitch: React.FC<ComponentDataT> = (props) => {
    const {type, props : valueProps} = props
    switch(type){
        case 'arrow':
            return <NGLArrow {...valueProps}/>
            
        case 'box':
            return <NGLBox {...valueProps}/>
            
        case 'cone':
            return <NGLCone {...valueProps}/>
            
        case 'ellipsoid':
            return <NGLEllipsoid {...valueProps}/>
            
        case 'tetrahedron':
            return <NGLTetrahedron {...valueProps}/>
            
        case 'sphere':
            return <NGLSphere {...valueProps}/>
            
        case 'cylinder':
            return <NGLCylinder {...valueProps}/>
            
        case 'octahedron':
            return <NGLOctahedron {...valueProps}/>
            
        case 'text':
            return <NGLText {...valueProps}/>
            
        case 'torus':
            return <NGLTorus {...valueProps}/>
        
        case 'file':
            return <NGLFile {...valueProps}/>    
        
        default:
            return <h1>HELLOOOOOO</h1>
    }
}

export default ComponentSwitch;
