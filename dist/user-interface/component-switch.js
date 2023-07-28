var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
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
import NGLFile from "ngl-viewer/file/file";
var ComponentSwitch = function (props) {
    var type = props.type, valueProps = props.props;
    switch (type) {
        case 'arrow':
            return _jsx(NGLArrow, __assign({}, valueProps));
        case 'box':
            return _jsx(NGLBox, __assign({}, valueProps));
        case 'cone':
            return _jsx(NGLCone, __assign({}, valueProps));
        case 'ellipsoid':
            return _jsx(NGLEllipsoid, __assign({}, valueProps));
        case 'tetrahedron':
            return _jsx(NGLTetrahedron, __assign({}, valueProps));
        case 'sphere':
            return _jsx(NGLSphere, __assign({}, valueProps));
        case 'cylinder':
            return _jsx(NGLCylinder, __assign({}, valueProps));
        case 'octahedron':
            return _jsx(NGLOctahedron, __assign({}, valueProps));
        case 'text':
            return _jsx(NGLText, __assign({}, valueProps));
        case 'torus':
            return _jsx(NGLTorus, __assign({}, valueProps));
        case 'file':
            return _jsx(NGLFile, __assign({}, valueProps));
        default:
            return null;
    }
};
export default ComponentSwitch;
