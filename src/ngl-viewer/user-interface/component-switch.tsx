import React from "react";
import NGLArrow from "../shapes/arrow";
import NGLBox from "../shapes/box";
import NGLCone from "../shapes/cone";
import NGLEllipsoid from "../shapes/ellipsoid";
import NGLOctahedron from "../shapes/octahedron";
import NGLSphere from "../shapes/sphere";
import NGLTetrahedron from "../shapes/tetrahedron";
import NGLText from "../shapes/text";
import NGLCylinder from "../shapes/cylinder";
import NGLTorus from "../shapes/torus";
import { ComponentDataT } from "../user-interface/component-data";
import NGLFile from "../file/file";

const ComponentSwitch = (props : ComponentDataT) => {
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
            return null
    }
}

export default ComponentSwitch;
