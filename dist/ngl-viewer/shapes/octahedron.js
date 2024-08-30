import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useComponentFromObject } from './base-shape';
import * as NGL from 'ngl';
import { randomString } from '../utils/utils';
export default function NGLOctahedron(_a) {
    var name = _a.name, position = _a.position, color = _a.color, size = _a.size, heightAxis = _a.heightAxis, depthAxis = _a.depthAxis, shapeParams = _a.shapeParams, viewSettings = _a.viewSettings;
    var shapeCreator = React.useMemo(function () {
        return new NGL.Shape(undefined, shapeParams).addOctahedron(position, color, size, heightAxis, depthAxis, name === undefined ? randomString(10) : name);
    }, [name, position, color, size, heightAxis, depthAxis, shapeParams]);
    useComponentFromObject(shapeCreator, viewSettings);
    return _jsx(_Fragment, {});
}
