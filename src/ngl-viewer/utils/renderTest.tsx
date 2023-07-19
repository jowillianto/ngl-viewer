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
import { mockComponentsData } from "ngl-viewer/componentData";
import { ComponentDataT } from "ngl-viewer/componentData";
import React from "react";


export default class ComponentSwitch extends React.Component<ComponentDataT>{
    constructor(props : ComponentDataT){
        super(props)
    }
    render(){
        const value = this.props
    
        switch(value.type){
            case 'arrow':
                return <NGLArrow {...value.props}/>
                
            case 'box':
                return <NGLBox {...value.props}/>
                
            case 'cone':
                return <NGLCone {...value.props}/>
                
            case 'ellipsoid':
                return <NGLEllipsoid {...value.props}/>
                
            case 'tetrahedron':
                return <NGLTetrahedron {...value.props}/>
                
            case 'sphere':
                return <NGLSphere {...value.props}/>
                
            case 'cylinder':
                return <NGLCylinder {...value.props}/>
                
            case 'octahedron':
                return <NGLOctahedron {...value.props}/>
                
            case 'text':
                return <NGLText {...value.props}/>
                
            case 'torus':
                return <NGLTorus {...value.props}/> 
            }       
        
    }
}